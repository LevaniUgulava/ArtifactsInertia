<?php

use App\Models\User;

it('redirects guests to the localized login page', function () {
    $this->get('/admin')->assertRedirect('/admin/login');
});

it('renders the dedicated admin login page', function () {
    $this->get('/admin/login')
        ->assertInertia(fn ($page) => $page->component('Admin/Auth/Login'));
});

it('allows an admin to sign in through the dedicated admin login', function () {
    $user = User::factory()->admin()->create([
        'email' => 'admin-login@example.com',
        'password' => 'password',
    ]);

    $this->post('/admin/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect('/admin/dashboard');
});

it('renders the admin dashboard for admin users', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get('/admin/dashboard')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Main/Dashboard')
            ->has('stats')
        );
});

it('rejects authenticated non-admin users', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/dashboard')
        ->assertForbidden();
});

it('requires authenticated users to have a verified email address', function () {
    $user = User::factory()->admin()->unverified()->create();

    $this->actingAs($user)
        ->get('/admin/dashboard')
        ->assertRedirect('/ka/verification');
});
