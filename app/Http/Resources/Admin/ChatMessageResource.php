<?php

namespace App\Http\Resources\Admin;

use App\Models\SupportMessage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SupportMessage
 */
final class ChatMessageResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'message' => $this->message,
            'createdAt' => $this->created_at?->toIso8601String(),
            'isAdmin' => $this->sender_id === $this->chat?->operator_id,
            'sender' => $this->sender?->name,
            'imageUrls' => $this->image_urls ?? [],
        ];
    }
}
