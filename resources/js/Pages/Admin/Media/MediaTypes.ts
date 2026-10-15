export type MediaRecord = {
    id: number;
    name: string;
    fileName: string;
    mimeType: string;
    url: string | null;
    modelType: string;
};

export type MediaProps = {
    media: {
        data: MediaRecord[];
        links: { url: string | null; label: string; active: boolean }[];
    };
};

export type MediaSafeImageProps = {
    alt: string;
    src: string | null;
};
