import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import admin from '@/routes/admin';
import type { UseResourceFormParams } from '@/Pages/Admin/Components/ResourceFormTypes';

export function useResourceForm({ resource, values, recordId }: UseResourceFormParams) {
    const form = useForm(values);
    const isEditing = recordId != null;

    const endpoint = resource === 'categories'
        ? (isEditing ? admin.categories.update(recordId).url : admin.categories.store().url)
        : (isEditing ? admin.collections.update(recordId).url : admin.collections.store().url);

    const indexHref = resource === 'categories' ? admin.categories.index.url() : admin.collections.index.url();

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isEditing) {
            form.put(endpoint);
        } else {
            form.post(endpoint);
        }
    }

    return { form, isEditing, indexHref, submit };
}