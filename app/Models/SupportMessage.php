<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('support_messages')]
#[Fillable(['support_chat_id', 'sender_id', 'message', 'image_urls'])]
class SupportMessage extends Model
{
    protected function casts(): array
    {
        return [
            'image_urls' => 'array',
        ];
    }

    public function chat(): BelongsTo
    {
        return $this->belongsTo(SupportChat::class, 'support_chat_id');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
