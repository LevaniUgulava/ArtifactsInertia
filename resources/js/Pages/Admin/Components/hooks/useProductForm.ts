import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { create, update } from '@/routes/admin/products';
import { emptyVariant } from '@/constants/productForm';
import type { ProductFormData, UseProductFormParams, VariantForm } from '@/Pages/Admin/Components/ProductFormTypes';

export function useProductForm({ values, recordId }: UseProductFormParams) {
    const form = useForm<ProductFormData>(values);
    const isEditing = recordId != null;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isEditing) {
            form.put(update({ id: recordId }).url);
        } else {
            form.post(create().url);
        }
    }

    function updateVariant(index: number, field: keyof VariantForm, value: string) {
        const variants = form.data.variants.map((variant, variantIndex) => (variantIndex === index ? {
            ...variant,
            [field]: value,
        } : variant));
        form.setData('variants', variants);
    }

    function addVariant() {
        form.setData('variants', [...form.data.variants, emptyVariant]);
    }

    function removeVariant(index: number) {
        form.setData('variants', form.data.variants.filter((_, variantIndex) => variantIndex !== index));
    }

    return { form, isEditing, submit, updateVariant, addVariant, removeVariant };
}