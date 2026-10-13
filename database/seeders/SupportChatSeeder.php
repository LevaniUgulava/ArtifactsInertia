<?php

namespace Database\Seeders;

use App\Models\SupportChat;
use App\Models\SupportMessage;
use App\Models\User;
use Illuminate\Database\Seeder;

class SupportChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = User::factory()->create([
            'name' => 'Gucci Demo Customer',
            'email' => 'customer@gucci-demo.test',
        ]);

        $operator = User::factory()->create([
            'name' => 'Gucci Demo Operator',
            'email' => 'operator@gucci-demo.test',
        ]);

        SupportChat::factory()
            ->for($customer)
            ->state(['operator_id' => $operator->id])
            ->closed()
            ->has(SupportMessage::factory()->count(2)->state(['sender_id' => $operator->id]), 'messages')
            ->has(SupportMessage::factory()->count(1), 'messages')
            ->create();

        SupportChat::factory()
            ->for($customer)
            ->open()
            ->state(['operator_id' => $operator->id])
            ->has(SupportMessage::factory()->count(3)->state(['sender_id' => $operator->id]), 'messages')
            ->has(SupportMessage::factory()->count(2), 'messages')
            ->create();

        SupportChat::factory()
            ->for($customer)
            ->pending()
            ->withMessages(1)
            ->create();
    }
}
