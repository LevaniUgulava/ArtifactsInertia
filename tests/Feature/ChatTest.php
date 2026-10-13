<?php

use App\Enums\SupportChatStatus;
use App\Events\ChatStatusChanged;
use App\Events\MessageSent;
use App\Models\SupportChat;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Support\Facades\Event;

it('opens a support chat for a customer', function () {
    $customer = User::factory()->create();

    $this->actingAs($customer)
        ->postJson('/en/chat')
        ->assertOk()
        ->assertJsonPath('status', 'pending')
        ->assertJsonPath('user.name', $customer->name)
        ->assertJsonCount(0, 'messages');
});

it('broadcasts a status change when a new chat is created', function () {
    Event::fake();

    $customer = User::factory()->create();

    $this->actingAs($customer)
        ->postJson('/en/chat')
        ->assertOk();

    Event::assertDispatched(ChatStatusChanged::class, fn (ChatStatusChanged $event) => $event->chat->user_id === $customer->id
        && $event->chat->status->value === 'pending');
});

it('reuses the customer active chat instead of creating a new one', function () {
    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Open,
    ]);
    SupportMessage::create([
        'support_chat_id' => $chat->id,
        'sender_id' => $customer->id,
        'message' => 'Hello, I need help.',
    ]);

    $this->actingAs($customer)
        ->postJson('/en/chat')
        ->assertOk()
        ->assertJsonPath('id', $chat->id)
        ->assertJsonPath('messages.0.message', 'Hello, I need help.')
        ->assertJsonCount(1, 'messages');
});

it('sends a message from a customer and broadcasts it', function () {
    Event::fake();

    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Pending,
    ]);

    $this->actingAs($customer)
        ->postJson('/en/chat/message', ['chatId' => $chat->id, 'message' => 'Need help with my order.'])
        ->assertOk()
        ->assertJsonPath('message.message', 'Need help with my order.')
        ->assertJsonPath('message.isAdmin', false);

    $chat->refresh();

    expect($chat->status)->toBe(SupportChatStatus::Open);
    $this->assertDatabaseHas('support_messages', [
        'support_chat_id' => $chat->id,
        'message' => 'Need help with my order.',
    ]);

    Event::assertDispatched(MessageSent::class, fn (MessageSent $messageSent) => $messageSent->message->message === 'Need help with my order.'
        && $messageSent->message->support_chat_id === $chat->id);
});

it('blocks a customer from sending to another customers chat', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $owner->id,
        'status' => SupportChatStatus::Pending,
    ]);

    $this->actingAs($other)
        ->postJson('/en/chat/message', ['chatId' => $chat->id, 'message' => 'Hello?'])
        ->assertNotFound();
});

it('allows a customer to close their own conversation', function () {
    Event::fake();

    $customer = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $customer->id,
        'status' => SupportChatStatus::Open,
    ]);

    $this->actingAs($customer)
        ->postJson("/en/chat/{$chat->id}/close")
        ->assertOk()
        ->assertJsonPath('status', 'close');

    expect($chat->fresh()->status)->toBe(SupportChatStatus::Closed);
    Event::assertDispatched(ChatStatusChanged::class, fn (ChatStatusChanged $event) => $event->chat->is($chat)
        && $event->chat->status === SupportChatStatus::Closed);
});

it('blocks a customer from closing another customers conversation', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $chat = SupportChat::create([
        'user_id' => $owner->id,
        'status' => SupportChatStatus::Open,
    ]);

    $this->actingAs($other)
        ->postJson("/en/chat/{$chat->id}/close")
        ->assertForbidden();
});
