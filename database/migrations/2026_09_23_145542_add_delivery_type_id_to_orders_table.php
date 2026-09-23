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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('delivery_type_id')
                ->after('status')
                ->nullable()
                ->constrained('delivery_types')
                ->nullOnDelete();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('delivery_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('delivery_type');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('delivery_type_id');
        });
    }
};
