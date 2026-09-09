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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('spu')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->string('name');
            $table->string('eyebrow');
            $table->text('description');
            $table->string('badge')->nullable();
            $table->json('benefits');
            $table->json('details');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
