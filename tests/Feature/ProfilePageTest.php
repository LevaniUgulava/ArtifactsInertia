<?php

use App\Models\User;

it('renders the profile dashboard for an authenticated user', function () {
    $user = User::factory()->create([
        'name' => 'Camille Rousseau',
        'email' => 'camille@example.com',
    ]);

    $this->actingAs($user)
        ->get('/en/profile')
        ->assertInertia(fn ($page) => $page
            ->component('Profile/Profile')
            ->has('profile.orders', 3)
            ->has('profile.savedItems', 4)
            ->where('profile.name', 'Camille Rousseau')
            ->where('profile.email', 'camille@example.com'));
});

it('keeps the account route as a profile dashboard alias', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/en/account')
        ->assertInertia(fn ($page) => $page->component('Profile/Profile'));
});

it('redirects profile guests to localized login', function () {
    $this->get('/en/profile')->assertRedirect('/en/login');
});
