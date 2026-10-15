import { useState } from 'react';

export function useImageError() {
    const [hasError, setHasError] = useState(false);

    function onError() {
        setHasError(true);
    }

    return { hasError, onError };
}