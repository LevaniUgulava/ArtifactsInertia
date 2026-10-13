<?php

namespace App\Http\Resources\Admin;

use App\Models\SupportChat;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin SupportChat
 */
final class SelectedChatResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status->value,
            'user' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
            ],
            'messages' => ChatMessageResource::collection($this->messages)->resolve(),
        ];
    }
}
