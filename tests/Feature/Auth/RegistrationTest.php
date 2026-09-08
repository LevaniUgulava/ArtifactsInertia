<?php

use App\Models\User;
use App\Notifications\EmailVerification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

it('registers a new user and sends a verification email', function () {
    Notification::fake();

    $this->post('/register', [
        'username' => 'janedoe',
        'email' => 'jane@example.com',
        'password' => 'password1',
        'password_confirmation' => 'password1',
    ])->assertRedirect('/en/verification')
        ->assertSessionHas('status', 'verification-link-sent');

    $user = User::where('email', 'jane@example.com')->sole();

    expect($user->name)->toBe('janedoe')
        ->and(Hash::check('password1', $user->password))->toBeTrue()
        ->and($user->fresh()->hasVerifiedEmail())->toBeFalse()
        ->and($this->isAuthenticated())->toBeFalse();

    Notification::assertSentTo($user, EmailVerification::class);
});

it('rejects a registration with an existing email', function () {
    User::factory()->create(['email' => 'jane@example.com']);

    $this->post('/register', [
        'username' => 'janedoe',
        'email' => 'jane@example.com',
        'password' => 'password1',
        'password_confirmation' => 'password1',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
    expect(User::count())->toBe(1);
});

it('rejects a registration when a field is invalid', function (string $field, array $payload) {
    $this->post('/register', $payload)
        ->assertSessionHasErrors($field);

    $this->assertGuest();
    expect(User::count())->toBe(0);
})->with([
    'missing username' => ['username', [
        'email' => 'jane@example.com',
        'password' => 'password1',
        'password_confirmation' => 'password1',
    ]],
    'invalid email' => ['email', [
        'username' => 'janedoe',
        'email' => 'not-an-email',
        'password' => 'password1',
        'password_confirmation' => 'password1',
    ]],
    'short password' => ['password', [
        'username' => 'janedoe',
        'email' => 'jane@example.com',
        'password' => 'short',
        'password_confirmation' => 'short',
    ]],
    'mismatched password confirmation' => ['password', [
        'username' => 'janedoe',
        'email' => 'jane@example.com',
        'password' => 'password1',
        'password_confirmation' => 'password2',
    ]],
]);

it('allows a precognition request without creating a user', function () {
    $this->withHeader('Accept', 'application/json')
        ->withPrecognition()
        ->post('/register', [
            'username' => 'janedoe',
            'email' => 'jane@example.com',
            'password' => 'password1',
            'password_confirmation' => 'password1',
        ])
        ->assertSuccessfulPrecognition();

    expect(User::count())->toBe(0);
});

it('returns validation errors for a precognition request', function () {
    $this->withHeader('Accept', 'application/json')
        ->withPrecognition()
        ->post('/register', [
            'username' => 'janedoe',
            'email' => 'not-an-email',
            'password' => 'short',
            'password_confirmation' => 'short',
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email', 'password']);

    expect(User::count())->toBe(0);
});
