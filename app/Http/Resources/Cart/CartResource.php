<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'shipping' => (float) ($this->shipping ?? 12),
            'items' => ItemsResource::collection($this?->items ?? collect())->resolve($request),
        ];
    }
}
