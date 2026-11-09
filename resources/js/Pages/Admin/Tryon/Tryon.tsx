import { ImagePlus, LoaderCircle, RefreshCw, WandSparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { cn } from '@/lib/utils';
import { TryonResultImage } from '@/Pages/Admin/Tryon/Components/TryonResultImage';
import { useTryon } from '@/Pages/Admin/Tryon/hooks/useTryon';
import type { TryonImageUploadProps, TryonProps } from '@/Pages/Admin/Tryon/TryonTypes';
import { tryonAccept } from '@/constants/tryon';

export default function Tryon({ predictions: initialPredictions }: TryonProps) {
    const { t } = useTranslation('admin');
    const {
        errorMessage,
        isProcessing,
        modelImage,
        modelPreviewUrl,
        onModelImageChange,
        onProductImageChange,
        predictionStatus,
        productImage,
        productPreviewUrl,
        resultUrl,
        setImage,
        submit,
        clear,
        predictions,
        formatCreatedAt,
        getRefreshHandler,
        refreshingPredictionId,
        refreshRequestProcessing,
    } = useTryon({ predictions: initialPredictions });

    const canSubmit = Boolean(modelImage && productImage) && !isProcessing;

    return (
        <div className="mx-auto w-full max-w-6xl space-y-8">
            <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">{t('tryonBreadcrumb')}</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{t('tryonTitle')}</h1>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600">{t('tryonDescription')}</p>
                </div>
            </header>

            <section className="grid gap-5 lg:grid-cols-2" aria-label={t('tryonInputs')}>
                <ImageUploadCard
                    accept={tryonAccept}
                    description={t('tryonModelDescription')}
                    disabled={isProcessing}
                    file={modelImage}
                    inputId="model_image"
                    onChange={onModelImageChange}
                    previewUrl={modelPreviewUrl}
                    title={t('tryonModelImage')}
                />
                <ImageUploadCard
                    accept={tryonAccept}
                    description={t('tryonProductDescription')}
                    disabled={isProcessing}
                    file={productImage}
                    inputId="product_image"
                    onChange={onProductImageChange}
                    previewUrl={productPreviewUrl}
                    title={t('tryonProductImage')}
                />
            </section>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canSubmit}
                    onClick={submit}
                    type="button"
                >
                    {isProcessing ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : <WandSparkles aria-hidden="true" size={18} />}
                    {isProcessing ? t('tryonProcessing') : t('tryonGenerate')}
                </button>
                {(resultUrl || errorMessage) && (
                    <button className="min-h-12 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={clear} type="button">
                        {t('tryonReset')}
                    </button>
                )}
                {isProcessing && predictionStatus && (
                    <p aria-live="polite" className="text-sm text-slate-600">
                        {t('tryonStatus', { status: t(`tryonStatus_${predictionStatus}`, { defaultValue: predictionStatus }) })}
                    </p>
                )}
            </div>

            {errorMessage && (
                <div aria-live="assertive" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                    {errorMessage}
                </div>
            )}

            {resultUrl && (
                <section className="space-y-4" aria-label={t('tryonResult')}>
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-950">{t('tryonResult')}</h2>
                        <p className="mt-1 text-sm text-slate-600">{t('tryonResultDescription')}</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <TryonResultImage alt={t('tryonResultAlt')} key={resultUrl} src={resultUrl} />
                    </div>
                </section>
            )}

            <section className="space-y-4" aria-label={t('tryonHistoryTitle')}>
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">{t('tryonHistoryTitle')}</h2>
                    <p className="mt-1 text-sm text-slate-600">{t('tryonHistoryDescription')}</p>
                </div>

                {predictions.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {predictions.map((prediction) => (
                            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" key={prediction.id}>
                                <div className="aspect-[4/3] bg-slate-50">
                                    {prediction.resultUrl ? (
                                        <TryonResultImage alt={t('tryonHistoryResultAlt')} key={prediction.resultUrl} src={prediction.resultUrl} />
                                    ) : (
                                        <div className="grid size-full place-items-center px-5 text-center text-sm text-slate-500">
                                            {t(`tryonStatus_${prediction.status}`, { defaultValue: prediction.status })}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 space-y-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {t(`tryonStatus_${prediction.status}`, { defaultValue: prediction.status })}
                                            </p>
                                            <time className="block text-xs text-slate-500" dateTime={prediction.createdAt}>
                                                {formatCreatedAt(prediction.createdAt)}
                                            </time>
                                        </div>
                                        <button
                                            aria-label={t('tryonRefreshPrediction', { id: prediction.predictionId })}
                                            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={refreshRequestProcessing}
                                            onClick={getRefreshHandler(prediction.id)}
                                            type="button"
                                        >
                                            <RefreshCw aria-hidden="true" className={cn({ 'animate-spin': refreshingPredictionId === prediction.id })} size={14} />
                                            {refreshingPredictionId === prediction.id ? t('tryonRefreshing') : t('tryonRefresh')}
                                        </button>
                                    </div>
                                    <p className="truncate font-mono text-[11px] text-slate-400" title={prediction.predictionId}>
                                        {prediction.predictionId}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
                        {t('tryonHistoryEmpty')}
                    </div>
                )}
            </section>
        </div>
    );
}

Tryon.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

function ImageUploadCard({ accept, description, disabled, file, inputId, onChange, previewUrl, title }: TryonImageUploadProps) {
    const { t } = useTranslation('admin');

    return (
        <label className={cn('group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300', { 'cursor-not-allowed opacity-60': disabled })}>
            <div className="flex items-start justify-between gap-4 p-5">
                <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-900">{title}</span>
                    <p className="text-xs leading-5 text-slate-500">{description}</p>
                </div>
                <ImagePlus aria-hidden="true" className="shrink-0 text-slate-400" size={20} />
            </div>
            <div className={cn('relative grid aspect-[4/3] place-items-center overflow-hidden bg-slate-50', { 'bg-slate-100': previewUrl })}>
                {previewUrl ? (
                    <img alt={t('tryonPreviewAlt', { title })} className="size-full object-contain" src={previewUrl} />
                ) : (
                    <div className="flex flex-col items-center gap-3 px-6 text-center text-slate-500">
                        <span className="grid size-12 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                            <ImagePlus aria-hidden="true" size={21} />
                        </span>
                        <span className="text-sm font-medium">{t('tryonChooseImage')}</span>
                        <span className="text-xs">{t('tryonImageTypes')}</span>
                    </div>
                )}
                <input accept={accept} className="sr-only" disabled={disabled} id={inputId} onChange={onChange} type="file" />
            </div>
            <span className="min-h-12 truncate border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                {file ? file.name : t('tryonNoImageSelected')}
            </span>
        </label>
    );
}
