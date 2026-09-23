<?php

namespace Database\Seeders;

use App\Models\PromoCode;
use Illuminate\Database\Seeder;

class PromoCodeSeeder extends Seeder
{
    /**
     * Seed the active promo codes.
     */
    public function run(): void
    {
        PromoCode::updateOrCreate(
            ['code' => 'ATELIER25'],
            ['type' => 'fixed', 'value' => 25, 'is_active' => true],
        );
    }
}
