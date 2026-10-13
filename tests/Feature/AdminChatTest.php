<?php

use App\Enums\SupportChatStatus;
use App\Events\ChatStatusChanged;
use App\Events\MessageSent;
use App\Models\SupportChat;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Support\Facades\Event;

it('renders support conversations for admins', function () {
    $admin = User::factory()->admin()->create();
    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Pending,
    ]);
    SupportMessage::create([
        'support_chat_id' => $chat->id,
        'sender_id' => $customer->id,
        'message' => 'I need help with my order.',
    ]);

    $this->actingAs($admin)
        ->get('/admin/chat')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Chat/Index')
            ->has('chats', 1)
            ->where('selectedChat.id', $chat->id)
            ->where('selectedChat.messages.0.message', 'I need help with my order.')
        );
});

it('lets an admin reply to a chat and broadcast the message', function () {
    Event::fake();

    $admin = User::factory()->admin()->create();
    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Pending,
    ]);

    $this->actingAs($admin)
        ->postJson("/admin/chat/{$chat->id}/message", ['message' => 'We are on it.'])
        ->assertOk()
        ->assertJsonPath('message.message', 'We are on it.')
        ->assertJsonPath('message.isAdmin', true);

    $chat->refresh();

    expect($chat->status)->toBe(SupportChatStatus::Open)
        ->and($chat->operator_id)->toBe($admin->id);

    Event::assertDispatched(MessageSent::class, fn (MessageSent $messageSent) => $messageSent->message->message === 'We are on it.');
});

it('claims a pending chat when an admin opens it and broadcasts the status change', function () {
    Event::fake();

    $admin = User::factory()->admin()->create();
    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Pending,
    ]);

    $this->actingAs($admin)
        ->getJson("/admin/chat/{$chat->id}")
        ->assertOk()
        ->assertJsonPath('status', 'open');

    $chat->refresh();

    expect($chat->status)->toBe(SupportChatStatus::Open)
        ->and($chat->operator_id)->toBe($admin->id);

    Event::assertDispatched(ChatStatusChanged::class, fn (ChatStatusChanged $event) => $event->chat->is($chat)
        && $event->chat->status->value === 'open'
        && $event->chat->operator_id === $admin->id);
});

it('rejects support chat access for non-admin users', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/chat')
        ->assertForbidden();
});

it('allows an admin to close a conversation', function () {
    Event::fake();

    $admin = User::factory()->admin()->create();
    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Open,
    ]);

    $this->actingAs($admin)
        ->postJson("/admin/chat/{$chat->id}/close")
        ->assertOk()
        ->assertJsonPath('status', 'close');

    expect($chat->fresh()->status)->toBe(SupportChatStatus::Closed);
    Event::assertDispatched(ChatStatusChanged::class, fn (ChatStatusChanged $event) => $event->chat->is($chat)
        && $event->chat->status === SupportChatStatus::Closed);
});
