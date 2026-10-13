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
        $color = fake()->randomElement([
            ['value' => 'black', 'label' => 'Black', 'hex' => '#171717'],
            ['value' => 'camel', 'label' => 'Camel', 'hex' => '#c69768'],
            ['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'],
            ['value' => 'emerald', 'label' => 'Emerald', 'hex' => '#315c5b'],
        ]);

        return [
            'product_id' => Product::factory(),
            'sku' => fake()->unique()->bothify('GG-####-????'),
            'color' => $color['value'],
            'color_label' => $color['label'],
            'color_hex' => $color['hex'],
            'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            'price' => fake()->randomFloat(2, 420, 1500),
            'stock' => fake()->numberBetween(4, 36),
        ];
    }
}
