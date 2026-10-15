<?php

namespace App\Http\Controllers;

use App\Enums\SupportChatStatus;
use App\Events\ChatStatusChanged;
use App\Events\MessageSent;
use App\Http\Requests\AdminChatMessageRequest;
use App\Http\Requests\ChatRequest;
use App\Http\Resources\Admin\ChatMessageResource;
use App\Http\Resources\Admin\ChatResource;
use App\Http\Resources\Admin\SelectedChatResource;
use App\Models\SupportChat;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function openChat(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $chat = SupportChat::query()
            ->where('user_id', $user->id)
            ->where('status', '!=', SupportChatStatus::Closed->value)
            ->latest('updated_at')
            ->first();

        if (! $chat) {
            $chat = SupportChat::create([
                'user_id' => $user->id,
                'operator_id' => null,
                'status' => SupportChatStatus::Pending,
            ]);

            broadcast(new ChatStatusChanged($chat->load('user', 'operator', 'latestMessage')));
        }

        $chat->load(['user', 'messages.sender', 'messages.chat:id,operator_id']);

        return response()->json(SelectedChatResource::make($chat)->resolve());
    }

    public function message(ChatRequest $request): JsonResponse
    {
        $chat = SupportChat::query()
            ->whereKey($request->string('chatId')->toString())
            ->whereBelongsTo($request->user())
            ->firstOrFail();

        $message = $chat->messages()->create([
            'sender_id' => $request->user()->id,
            'message' => $request->string('message')->toString(),
            'image_urls' => $request->validated('imageUrls') ?? [],
        ]);

        $chat->update(['status' => SupportChatStatus::Open]);

        broadcast(new MessageSent($message->load('chat.user', 'sender')))->toOthers();

        return response()->json([
            'message' => ChatMessageResource::make($message)->resolve(),
        ]);
    }

    public function close(Request $request, SupportChat $chat): JsonResponse
    {
        abort_unless($chat->user_id === $request->user()->id || $request->user()->hasRole('admin'), 403);

        if ($chat->status !== SupportChatStatus::Closed) {
            $chat->update(['status' => SupportChatStatus::Closed]);
            broadcast(new ChatStatusChanged($chat->load('user', 'operator', 'latestMessage')))->toOthers();
        }

        return response()->json(['status' => $chat->status->value]);
    }

    public function show(SupportChat $chat): JsonResponse
    {
        if ($chat->operator_id === null) {
            $chat->operator_id = auth()->id();
        }

        if ($chat->status === SupportChatStatus::Pending) {
            $chat->status = SupportChatStatus::Open;
        }

        if ($chat->isDirty()) {
            $chat->save();
        }

        broadcast(new ChatStatusChanged($chat->load('user', 'operator')));

        return response()->json(
            SelectedChatResource::make(
                $chat->load(['messages.sender', 'messages.chat:id,operator_id'])
            )->resolve()
        );
    }

    public function adminMessage(AdminChatMessageRequest $request, SupportChat $chat): JsonResponse
    {
        $message = $chat->messages()->create([
            'sender_id' => $request->user()->id,
            'message' => $request->string('message')->toString(),
        ]);

        $chat->update([
            'status' => SupportChatStatus::Open,
            'operator_id' => $chat->operator_id ?? $request->user()->id,
        ]);

        $message->load('chat.user');

        broadcast(new MessageSent($message))->toOthers();

        return response()->json([
            'message' => ChatMessageResource::make($message)->resolve(),
        ]);
    }

    public function adminIndex(Request $request): Response
    {
        $chats = SupportChat::query()
            ->with(['user', 'latestMessage'])
            ->withCount('messages')
            ->latest('updated_at')
            ->get();

        $selectedChat = $request->query('chat') ?? $chats->first()?->id;

        $selected = $selectedChat
            ? $chats->firstWhere('id', $selectedChat)?->load(['messages.sender', 'messages.chat:id,operator_id'])
            : null;

        return Inertia::render('Admin/Chat/Chat', [
            'chats' => ChatResource::collection($chats)->resolve(),
            'selectedChat' => $selected ? SelectedChatResource::make($selected)->resolve() : null,
        ]);
    }
}
