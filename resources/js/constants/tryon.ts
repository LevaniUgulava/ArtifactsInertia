export const tryonAccept = 'image/jpeg,image/png,image/webp';
export const tryonActiveStatuses = ['starting', 'in_queue', 'processing'];
export const tryonPollIntervalMs = 3000;
export const tryonMaxImageSizeBytes = 8 * 1024 * 1024;
export const tryonDateTimeOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
};
