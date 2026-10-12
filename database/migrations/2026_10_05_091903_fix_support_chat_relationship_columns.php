<?php

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
        Schema::table('support_messages', function (Blueprint $table): void {
            $table->renameColumn('support_chat_uuid', 'support_chat_id');
            $table->renameColumn('text', 'message');
            $table->renameColumn('image_url', 'image_urls');
        });

        Schema::table('support_messages', function (Blueprint $table): void {
            $table->json('image_urls')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('support_messages', function (Blueprint $table): void {
            $table->string('image_urls')->nullable()->change();
            $table->renameColumn('support_chat_id', 'support_chat_uuid');
            $table->renameColumn('message', 'text');
            $table->renameColumn('image_urls', 'image_url');
        });
    }
};
