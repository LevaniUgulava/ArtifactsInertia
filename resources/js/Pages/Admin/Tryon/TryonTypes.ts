import type { ChangeEvent } from 'react';

export type TryonFormData = {
    model_image: File | null;
    product_image: File | null;
};

export type TryonStartedResponse = {
    prediction: TryonHistoryItem;
};

export type TryonHistoryItem = {
    id: string;
    predictionId: string;
    status: string;
    resultUrl: string | null;
    createdAt: string;
};

export type TryonRefreshResponse = {
    prediction: TryonHistoryItem;
    error: { name: string | null; message: string } | null;
};

export type TryonProps = {
    predictions: TryonHistoryItem[];
    credits: TryonCredits | null;
};

export type TryonCredits = {
    total: number;
    subscription: number;
    on_demand: number;
};

export type TryonCreditsResponse = {
    credits: TryonCredits;
};

export type TryonImageUploadProps = {
    accept: string;
    description: string;
    disabled: boolean;
    file: File | null;
    inputId: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
    title: string;
};

export type TryonResultImageProps = {
    alt: string;
    src: string;
};
