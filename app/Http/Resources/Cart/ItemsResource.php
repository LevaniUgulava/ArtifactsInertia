<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->resource->id,
            'name' => $this->resource->variant->product->name,
            'price' => (float) $this->resource->price,
            'size' => $this->resource->variant->size,
            'color' => $this->resource->variant->color_label,
            'colorHex' => $this->resource->variant->color_hex,
            'quantity' => $this->resource->quantity,
            'image' => $this->resource->variant->imageUrls()[0]['src'] ?? '',
        ];
    }
}
