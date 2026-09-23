<?php

namespace Database\Seeders;

use App\Enums\DeliveryType as DeliveryTypeEnum;
use App\Models\DeliveryType;
use Illuminate\Database\Seeder;

class DeliveryTypeSeeder extends Seeder
{
    /**
     * Seed the available delivery methods.
     */
    public function run(): void
    {
        $deliveryTypes = [
            [
                'value' => DeliveryTypeEnum::Express->value,
                'name' => 'Express Delivery',
                'description' => '2–3 business days',
                'icon' => 'truck',
                'price' => 12,
            ],
            [
                'value' => DeliveryTypeEnum::Standard->value,
                'name' => 'Standard Shipping',
                'description' => '5–7 business days',
                'icon' => 'package',
                'price' => 0,
            ],
            [
                'value' => DeliveryTypeEnum::NextDay->value,
                'name' => 'Next Day',
                'description' => 'Next business day by 6pm',
                'icon' => 'zap',
                'price' => 24,
            ],
        ];

        foreach ($deliveryTypes as $deliveryType) {
            DeliveryType::query()->updateOrCreate(
                ['value' => $deliveryType['value']],
                $deliveryType,
            );
        }
    }
}
