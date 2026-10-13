<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'spu' => fake()->unique()->numerify('SPU-####'),
            'slug' => fake()->unique()->slug(),
            'name' => fake()->randomElement(['GG Wool Blazer', 'Silk Evening Dress', 'Horsebit Shoulder Bag', 'Tailored Wool Coat']),
            'eyebrow' => fake()->randomElement(['House Signatures', 'The Evening Edit', 'Gucci Edit']),
            'description' => 'A refined House-inspired piece with a considered silhouette, premium finishing, and enduring wardrobe appeal.',
            'badge' => fake()->randomElement([null, 'New', 'Trending']),
            'sex' => 'unisex',
            'benefits' => [],
            'details' => [],
        ];
    }
}
