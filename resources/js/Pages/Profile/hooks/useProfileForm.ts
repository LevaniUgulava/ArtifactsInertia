import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { update } from '@/routes/profile';
import type { ProfileFormData } from '../types/ProfileTypes';

export function useProfileForm(name: string, email: string) {
    const lang = useLocale();
    const form = useForm<ProfileFormData>({
        avatar: null,
        name,
        email,
        password: '',
        password_confirmation: '',
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    function selectAvatar(file: File) {
        const preview = URL.createObjectURL(file);

        setAvatarPreview(preview);
        form.setData('avatar', file);
        form.clearErrors('avatar');
    }

    function submit() {
        form.put(update.url({ lang }), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('password', 'password_confirmation'),
        });
    }

    return { avatarPreview, form, selectAvatar, submit };
}
