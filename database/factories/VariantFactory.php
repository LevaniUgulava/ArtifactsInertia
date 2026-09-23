<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Variant>
 */
class VariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $color = fake()->hexColor();

        return [
            'product_id' => Product::factory(),
            'sku' => fake()->unique()->bothify('SKU-####'),
            'color' => ltrim($color, '#'),
            'color_label' => fake()->colorName(),
            'color_hex' => $color,
            'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            'price' => fake()->randomFloat(2, 20, 800),
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}
