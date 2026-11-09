<?php

namespace Database\Factories;

use App\Models\TryonPrediction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TryonPrediction>
 */
class TryonPredictionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prediction_id' => fake()->uuid(),
            'status' => 'starting',
            'result_url' => null,
        ];
    }

    public function completed(?string $resultUrl = null): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'result_url' => $resultUrl ?? fake()->url().'/tryon-result.png',
        ]);
    }

    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'result_url' => null,
        ]);
    }
}
