<?php

namespace App\Events;

use App\Models\SupportMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public SupportMessage $message)
    {
        //
    }

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.'.$this->message->support_chat_id),
            new PrivateChannel('admin.chat'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MessageSent';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'message' => $this->message->message,
            'createdAt' => $this->message->created_at?->toIso8601String(),
            'isAdmin' => $this->message->sender_id === $this->message->chat?->operator_id,
            'sender' => $this->message->sender?->name,
            'imageUrls' => $this->message->image_urls ?? [],
            'supportChatId' => $this->message->support_chat_id,
            'status' => $this->message->chat?->status?->value,
            'user' => [
                'name' => $this->message->chat?->user?->name,
                'email' => $this->message->chat?->user?->email,
            ],
        ];
    }
}
