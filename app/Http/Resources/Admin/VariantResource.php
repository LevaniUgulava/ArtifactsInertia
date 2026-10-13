<?php

namespace App\Http\Resources\Admin;

use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Variant */
class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sku' => $this->sku,
            'color' => $this->color,
            'color_label' => $this->color_label,
            'color_hex' => $this->color_hex,
            'size' => $this->size,
            'price' => (string) $this->price,
            'stock' => $this->stock,
        ];
    }
}
