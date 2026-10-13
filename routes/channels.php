<?php

use App\Models\SupportChat;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{chatId}', function ($user, $chatId) {
    $chat = SupportChat::query()->find($chatId);

    if (! $chat) {
        return false;
    }

    return (int) $chat->user_id === (int) $user->id || $user->hasRole('admin');
});

Broadcast::channel('admin.chat', fn ($user) => $user->hasRole('admin'));
