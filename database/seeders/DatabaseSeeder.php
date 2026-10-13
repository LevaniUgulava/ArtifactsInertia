<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's feature-specific data.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Gucci Demo Admin',
            'email' => 'admin@gucci-demo.test',
        ]);

        $this->call([
            CatalogSeeder::class,
            DeliveryTypeSeeder::class,
            PromoCodeSeeder::class,
        ]);
    }
}
