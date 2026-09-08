<?php

use App\Models\User;

it('authenticates a user with valid credentials', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect('/');

    $this->assertAuthenticatedAs($user);
});

it('redirects an unverified user to the verification page', function () {
    $user = User::factory()->unverified()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect('/en/verification')
        ->assertSessionHas('status', 'verification-required');

    $this->assertAuthenticatedAs($user);
});

it('rejects an invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('rejects an unknown email', function () {
    $this->post('/login', [
        'email' => 'ghost@example.com',
        'password' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('allows a precognition request without authenticating', function () {
    $user = User::factory()->create();

    $this->withHeader('Accept', 'application/json')
        ->withPrecognition()
        ->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])
        ->assertSuccessfulPrecognition();

    $this->assertGuest();
});

it('rejects missing credentials', function (string $field, array $payload) {
    $this->post('/login', $payload)
        ->assertSessionHasErrors($field);

    $this->assertGuest();
})->with([
    'missing email' => ['email', ['password' => 'password']],
    'missing password' => ['password', ['email' => 'jane@example.com']],
]);

it('rate limits after five failed attempts', function () {
    $user = User::factory()->create();

    for ($i = 0; $i < 5; $i++) {
        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);
    }

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});
