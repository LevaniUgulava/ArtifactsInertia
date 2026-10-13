<?php

use App\Enums\SupportChatStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('support_chats', function (Blueprint $table) {
            $table->enum('status', array_column(SupportChatStatus::cases(), 'value'))->default(SupportChatStatus::Pending->value)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('support_chats', function (Blueprint $table) {
            $table->string('status')->default('pending')->change();
        });
    }
};
