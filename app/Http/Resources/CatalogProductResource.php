<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatalogProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->slug,
            'name' => $this->resource->name,
            'category' => $this->resource->categories->first()?->name ?? '',
            'collection' => $this->resource->collections->first()?->name ?? '',
            'price' => $this->resource->startingPrice() === null ? '' : '$'.$this->resource->startingPrice(),
            'badge' => $this->resource->badge,
            'colors' => $this->resource->variants->unique('color_hex')->pluck('color_hex')->values()->all(),
            'image' => $this->resource->imageUrls()[0]['src'] ?? '',
        ];
    }
}
