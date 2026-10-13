<?php

use App\Models\User;

it('redirects guests to the localized login page', function () {
    $this->get('/admin')->assertRedirect('/ka/login');
});

it('renders the admin dashboard for authenticated users', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/admin')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Main/Dashboard')
            ->has('stats')
        );
});

it('requires authenticated users to have a verified email address', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get('/admin')
        ->assertRedirect('/ka/verification');
});
