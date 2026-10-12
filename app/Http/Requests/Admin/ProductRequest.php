<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $product = $this->route('product');

        return [
            'spu' => ['required', 'string', 'max:80', Rule::unique('products', 'spu')->ignore($product)],
            'slug' => ['required', 'string', 'max:160', 'alpha_dash', Rule::unique('products', 'slug')->ignore($product)],
            'name' => ['required', 'string', 'max:160'],
            'eyebrow' => ['required', 'string', 'max:160'],
            'description' => ['required', 'string'],
            'badge' => ['nullable', 'string', 'max:80'],
            'sex' => ['required', Rule::in(['man', 'woman', 'unisex'])],
            'benefits' => ['nullable', 'array'],
            'benefits.*.label' => ['required', 'string', 'max:120'],
            'benefits.*.icon' => ['required', 'string', 'max:80'],
            'details' => ['nullable', 'array'],
            'details.*.title' => ['required', 'string', 'max:120'],
            'details.*.paragraphs' => ['nullable', 'array'],
            'details.*.paragraphs.*' => ['string', 'max:500'],
            'details.*.bullets' => ['nullable', 'array'],
            'details.*.bullets.*' => ['string', 'max:500'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'variants' => ['required', 'array', 'min:1'],
            'variants.*.sku' => ['required', 'string', 'max:80', 'distinct'],
            'variants.*.color' => ['required', 'string', 'max:80'],
            'variants.*.color_label' => ['required', 'string', 'max:80'],
            'variants.*.color_hex' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'variants.*.size' => ['required', 'string', 'max:40'],
            'variants.*.price' => ['required', 'numeric', 'min:0'],
            'variants.*.stock' => ['required', 'integer', 'min:0'],
        ];
    }
}
