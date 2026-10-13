<?php

namespace App\Models;

use App\Enums\SupportChatStatus;
use Database\Factories\SupportChatFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['user_id', 'operator_id', 'status'])]
#[Table('support_chats')]
class SupportChat extends Model
{
    /** @use HasFactory<SupportChatFactory> */
    use HasFactory;

    use HasUuids;

    /**
     * @return array<string, class-string>
     */
    protected function casts(): array
    {
        return [
            'status' => SupportChatStatus::class,
        ];
    }

    public function messages(): HasMany
    {
        return $this->hasMany(SupportMessage::class, 'support_chat_id');
    }

    public function latestMessage(): HasOne
    {
        return $this->hasOne(SupportMessage::class, 'support_chat_id')->latestOfMany();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function operator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'operator_id');
    }
}
