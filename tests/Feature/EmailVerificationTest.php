<?php

use App\Models\User;
use App\Notifications\EmailVerification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

it('renders the verification email with the user name and verification url', function () {
    Notification::fake();

    $user = User::factory()->create(['name' => 'Jane Customer']);
    $verificationUrl = 'https://ateliestreet.test/en/verification/verify/1/abc123';

    $user->notify(new EmailVerification($verificationUrl));

    Notification::assertSentTo($user, EmailVerification::class, function (EmailVerification $notification) use ($user, $verificationUrl) {
        $html = $notification->toMail($user)->render();

        return str_contains($html, 'Jane Customer')
            && str_contains($html, $verificationUrl)
            && str_contains($html, 'Verify Email Address');
    });
});

it('sends a verification notification on registration', function () {
    Notification::fake();

    $this->post('/register', [
        'username' => 'Jane Customer',
        'email' => 'jane@example.com',
        'password' => 'password1234',
        'password_confirmation' => 'password1234',
    ])->assertRedirect('/en/verification');

    $user = User::first();

    expect($user)->not->toBeNull()
        ->and($user->fresh()->hasVerifiedEmail())->toBeFalse();

    Notification::assertSentTo($user, EmailVerification::class);
});

it('marks the email as verified via the signed url', function () {
    $user = User::factory()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute('verification.verify', now()->addMinutes(60), [
        'user' => $user->getKey(),
        'hash' => sha1($user->getEmailForVerification()),
    ]);

    $this->get($verificationUrl)
        ->assertRedirect('/');

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue()
        ->and($this->isAuthenticated())->toBeTrue();
});

it('rejects a verification link with an invalid signature', function () {
    $user = User::factory()->unverified()->create();

    $this->get("/en/verification/verify/{$user->getKey()}/".sha1($user->getEmailForVerification()))
        ->assertForbidden();

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

it('resends the verification notification to an authenticated user', function () {
    Notification::fake();

    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->post('/verification-notification')
        ->assertRedirect('/en/verification');

    Notification::assertSentTo($user, EmailVerification::class);
});
