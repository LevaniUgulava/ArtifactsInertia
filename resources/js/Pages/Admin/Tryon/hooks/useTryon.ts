import { useHttp } from '@inertiajs/react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { tryonActiveStatuses, tryonDateTimeOptions, tryonMaxImageSizeBytes, tryonPollIntervalMs } from '@/constants/tryon';
import type { TryonFormData, TryonHistoryItem, TryonProps, TryonRefreshResponse, TryonStartedResponse } from '@/Pages/Admin/Tryon/TryonTypes';
import adminTryon from '@/routes/admin/tryon';

export function useTryon({ predictions: initialPredictions }: TryonProps) {
    const { t } = useTranslation('admin');
    const startRequest = useHttp<TryonFormData, TryonStartedResponse>({ model_image: null, product_image: null });
    const refreshRequest = useHttp<Record<string, never>, TryonRefreshResponse>({});
    const [predictions, setPredictions] = useState<TryonHistoryItem[]>(initialPredictions);
    const [modelPreviewUrl, setModelPreviewUrl] = useState<string | null>(null);
    const [productPreviewUrl, setProductPreviewUrl] = useState<string | null>(null);
    const [activePredictionId, setActivePredictionId] = useState<string | null>(
        () => initialPredictions.find(({ status }) => tryonActiveStatuses.includes(status))?.id ?? null,
    );
    const [predictionStatus, setPredictionStatus] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [refreshingPredictionId, setRefreshingPredictionId] = useState<string | null>(null);

    useEffect(() => {
        setPredictions(initialPredictions);
    }, [initialPredictions]);

    useEffect(() => {
        const image = startRequest.data.model_image;

        if (!image) {
            setModelPreviewUrl(null);

            return;
        }

        const previewUrl = URL.createObjectURL(image);
        setModelPreviewUrl(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [startRequest.data.model_image]);

    useEffect(() => {
        const image = startRequest.data.product_image;

        if (!image) {
            setProductPreviewUrl(null);

            return;
        }

        const previewUrl = URL.createObjectURL(image);
        setProductPreviewUrl(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [startRequest.data.product_image]);

    useEffect(() => {
        if (!activePredictionId) {
            return;
        }

        const currentPredictionId = activePredictionId;
        let isActive = true;
        let timeoutId: ReturnType<typeof setTimeout>;

        async function checkPrediction(): Promise<void> {
            setRefreshingPredictionId(currentPredictionId);

            try {
                const response = await refreshRequest.post(adminTryon.refresh(currentPredictionId).url);

                if (!isActive) {
                    return;
                }

                applyPrediction(response.prediction);
                setPredictionStatus(response.prediction.status);
                setRefreshingPredictionId(null);

                if (response.prediction.status === 'completed') {
                    if (response.prediction.resultUrl) {
                        setResultUrl(response.prediction.resultUrl);
                    } else {
                        setErrorMessage(t('tryonMissingOutput'));
                    }

                    setActivePredictionId(null);
                    return;
                }

                if (['failed', 'canceled', 'time_out'].includes(response.prediction.status)) {
                    setErrorMessage(response.error?.message ?? t('tryonFailed'));
                    setActivePredictionId(null);
                    return;
                }

                if (tryonActiveStatuses.includes(response.prediction.status)) {
                    timeoutId = setTimeout(checkPrediction, tryonPollIntervalMs);
                    return;
                }

                setErrorMessage(t('tryonUnknownStatus'));
                setActivePredictionId(null);
            } catch {
                if (isActive) {
                    setRefreshingPredictionId(null);
                    setErrorMessage(t('tryonStatusError'));
                    setActivePredictionId(null);
                }
            }
        }

        timeoutId = setTimeout(checkPrediction, tryonPollIntervalMs);

        return () => {
            isActive = false;
            clearTimeout(timeoutId);
        };
    }, [activePredictionId, refreshRequest.post, t]);

    function applyPrediction(prediction: TryonHistoryItem): void {
        setPredictions((current) => {
            const updated = current.some(({ id }) => id === prediction.id)
                ? current.map((item) => item.id === prediction.id ? prediction : item)
                : [prediction, ...current];

            return [...updated].sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt));
        });
    }

    function setImage(field: keyof TryonFormData, image: File | null): void {
        if (image && image.size > tryonMaxImageSizeBytes) {
            setErrorMessage(t('tryonImageTooLarge'));
            return;
        }

        startRequest.setData(field, image);
        setActivePredictionId(null);
        setPredictionStatus(null);
        setResultUrl(null);
        setErrorMessage(null);
    }

    function onModelImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const image = event.currentTarget.files?.[0] ?? null;
        event.currentTarget.value = '';
        setImage('model_image', image);
    }

    function onProductImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const image = event.currentTarget.files?.[0] ?? null;
        event.currentTarget.value = '';
        setImage('product_image', image);
    }

    function submit(): void {
        if (!startRequest.data.model_image || !startRequest.data.product_image || startRequest.processing) {
            return;
        }

        setErrorMessage(null);
        setResultUrl(null);
        setActivePredictionId(null);
        setPredictionStatus('starting');

        void startRequest.post(adminTryon.store().url, {
            onSuccess: (response) => {
                applyPrediction(response.prediction);
                setActivePredictionId(response.prediction.id);
            },
            onError: (errors) => setErrorMessage(
                errors.model_image || errors.product_image || t('tryonRequestError'),
            ),
            onHttpException: (response) => {
                try {
                    const body: unknown = JSON.parse(response.data);
                    const message = typeof body === 'object' && body !== null && 'message' in body
                        ? body.message
                        : null;

                    setErrorMessage(typeof message === 'string' ? message : t('tryonRequestError'));
                } catch {
                    setErrorMessage(t('tryonRequestError'));
                }
            },
            onNetworkError: () => {
                setErrorMessage(t('tryonRequestError'));
            },
        }).catch(() => {
            setErrorMessage((current) => current ?? t('tryonRequestError'));
        });
    }

    function refreshPrediction(predictionId: string): void {
        if (refreshRequest.processing) {
            return;
        }

        setRefreshingPredictionId(predictionId);

        void refreshRequest.post(adminTryon.refresh(predictionId).url, {
            onSuccess: (response) => {
                applyPrediction(response.prediction);

                if (response.error?.message) {
                    setErrorMessage(response.error.message);
                }

                if (tryonActiveStatuses.includes(response.prediction.status)) {
                    setPredictionStatus(response.prediction.status);
                    setActivePredictionId(predictionId);
                } else if (response.prediction.status === 'completed') {
                    setResultUrl(response.prediction.resultUrl);
                    setPredictionStatus('completed');
                    setActivePredictionId(null);
                    setErrorMessage(response.prediction.resultUrl ? null : t('tryonMissingOutput'));
                } else {
                    setPredictionStatus(response.prediction.status);
                    setActivePredictionId(null);
                }
            },
            onHttpException: (response) => {
                setErrorMessage(readResponseMessage(response.data) ?? t('tryonStatusError'));
            },
            onNetworkError: () => setErrorMessage(t('tryonStatusError')),
            onFinish: () => setRefreshingPredictionId(null),
        }).catch(() => {
            setErrorMessage((current) => current ?? t('tryonStatusError'));
            setRefreshingPredictionId(null);
        });
    }

    function getRefreshHandler(predictionId: string): () => void {
        return () => refreshPrediction(predictionId);
    }

    function formatCreatedAt(createdAt: string): string {
        return new Intl.DateTimeFormat(undefined, tryonDateTimeOptions).format(new Date(createdAt));
    }

    function clear(): void {
        startRequest.setData({ model_image: null, product_image: null });
        setPredictionStatus(null);
        setResultUrl(null);
        setErrorMessage(null);
    }

    return {
        errorMessage,
        formatCreatedAt,
        getRefreshHandler,
        isProcessing: startRequest.processing || activePredictionId !== null,
        modelImage: startRequest.data.model_image,
        modelPreviewUrl,
        onModelImageChange,
        onProductImageChange,
        predictions,
        predictionStatus,
        productImage: startRequest.data.product_image,
        productPreviewUrl,
        refreshingPredictionId,
        resultUrl,
        refreshRequestProcessing: refreshRequest.processing,
        setImage,
        submit,
        clear,
    };
}

function readResponseMessage(responseData: string): string | null {
    try {
        const body: unknown = JSON.parse(responseData);
        const message = typeof body === 'object' && body !== null && 'message' in body ? body.message : null;

        return typeof message === 'string' ? message : null;
    } catch {
        return null;
    }
}
