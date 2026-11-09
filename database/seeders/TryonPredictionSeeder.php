<?php

namespace Database\Seeders;

use App\Models\TryonPrediction;
use Illuminate\Database\Seeder;

class TryonPredictionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TryonPrediction::factory()->count(3)->create();
    }
}
