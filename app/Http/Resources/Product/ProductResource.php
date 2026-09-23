<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $variants = $this->resource->variants;

        return [
            'slug' => $this->resource->slug,
            'name' => $this->resource->name,
            'eyebrow' => $this->resource->eyebrow,
            'category' => $this->resource->categories->first()?->name ?? '',
            'collection' => $this->resource->collections->first()?->name ?? '',
            'price' => $this->resource->startingPrice() === null ? '' : '₾'.$this->resource->startingPrice(),
            'description' => $this->resource->description,
            'images' => $this->resource->imageUrls(),
            'colors' => $variants->unique('color')->map(fn ($variant): array => [
                'value' => $variant->color,
                'label' => $variant->color_label,
                'hex' => $variant->color_hex,
                'availableSizes' => $variants->where('color', $variant->color)->where('stock', '>', 0)->pluck('size')->unique()->values()->all(),
            ])->values()->all(),
            'sizes' => $variants->unique('size')->map(fn ($variant): array => [
                'value' => $variant->size,
            ])->values()->all(),
            'benefits' => $this->resource->benefits,
            'details' => $this->resource->details,
            'variant' => $variants->first()?->only(['id', 'sku', 'price', 'stock']),
        ];
    }
}
