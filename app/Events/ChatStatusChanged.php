<?php

namespace App\Events;

use App\Models\SupportChat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatStatusChanged implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public SupportChat $chat)
    {
        //
    }

    /**
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.'.$this->chat->id),
            new PrivateChannel('admin.chat'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ChatStatusChanged';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'chatId' => $this->chat->id,
            'status' => $this->chat->status?->value,
            'operator' => [
                'name' => $this->chat->operator?->name,
                'email' => $this->chat->operator?->email,
            ],
            'user' => [
                'name' => $this->chat->user?->name,
                'email' => $this->chat->user?->email,
            ],
            'lastMessage' => $this->chat->latestMessage?->message,
            'updatedAt' => $this->chat->updated_at?->toIso8601String(),
        ];
    }
}
