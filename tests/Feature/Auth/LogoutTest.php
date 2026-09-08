<?php

use App\Models\User;

it('logs out an authenticated user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/logout')
        ->assertRedirect('/');

    $this->assertGuest();
});

it('does not allow guests to log out', function () {
    $this->post('/logout')->assertRedirect('/en/login');
});

it('allows an authenticated user to access the account page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/en/account')
        ->assertInertia(fn ($page) => $page->component('Profile/Profile'));
});

it('redirects guests away from the account page', function () {
    $this->get('/en/account')
        ->assertRedirect('/en/login');
});

it('redirects a logged out user away from the account page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/logout')
        ->assertRedirect('/');

    $this->get('/en/account')->assertRedirect('/en/login');
});
