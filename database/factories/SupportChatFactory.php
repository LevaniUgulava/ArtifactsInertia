<?php

namespace Database\Factories;

use App\Enums\SupportChatStatus;
use App\Models\SupportChat;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SupportChat>
 */
class SupportChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'operator_id' => null,
            'status' => SupportChatStatus::Pending,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => SupportChatStatus::Pending,
        ]);
    }

    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => SupportChatStatus::Open,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => SupportChatStatus::Closed,
        ]);
    }

    public function withOperator(): static
    {
        return $this->state(fn (array $attributes) => [
            'operator_id' => User::factory(),
        ]);
    }

    public function withMessages(int $count = 3): static
    {
        return $this->has(SupportMessage::factory()->count($count), 'messages');
    }
}
