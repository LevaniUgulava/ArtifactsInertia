<?php

namespace Database\Factories;

use App\Models\SupportChat;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SupportMessage>
 */
class SupportMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'support_chat_id' => SupportChat::factory(),
            'sender_id' => User::factory(),
            'message' => fake()->sentence(),
        ];
    }
}
