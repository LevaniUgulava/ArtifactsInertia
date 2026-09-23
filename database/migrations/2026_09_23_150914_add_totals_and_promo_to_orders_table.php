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
            $table->foreignId('promo_code_id')->nullable()->after('delivery_type_id')->constrained()->nullOnDelete();
            $table->decimal('subtotal', 10, 2)->default(0)->after('promo_code_id');
            $table->decimal('shipping', 10, 2)->default(0)->after('subtotal');
            $table->decimal('discount', 10, 2)->default(0)->after('shipping');
            $table->decimal('total', 10, 2)->default(0)->after('discount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('promo_code_id');
            $table->dropColumn(['subtotal', 'shipping', 'discount', 'total']);
        });
    }
};
