<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's feature-specific data.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Gucci Demo Admin',
            'email' => 'admin@gucci-demo.test',
        ]);
        $admin->assignRole(Role::findOrCreate('admin'));

        $this->call([
            CatalogSeeder::class,
            DeliveryTypeSeeder::class,
            PromoCodeSeeder::class,
        ]);
    }
}
