<?php

namespace App\Http\Resources\Tryon;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TryonPredictionResource extends JsonResource
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
            'predictionId' => $this->resource->prediction_id,
            'status' => $this->resource->status,
            'resultUrl' => $this->resource->result_url,
            'createdAt' => $this->resource->created_at->toIso8601String(),
        ];
    }
}
