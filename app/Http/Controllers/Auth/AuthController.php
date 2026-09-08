<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Show the login page.
     */
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Show the registration page.
     */
    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Show the email verification page.
     */
    public function showVerification(): Response
    {
        return Inertia::render('Auth/Verification', [
            'status' => session('status'),
        ]);
    }

    /**
     * Show the password update page.
     */
    public function showUpdatePassword(): Response
    {
        return Inertia::render('Auth/UpdatePassword');
    }

    /**
     * Show the account page.
     */
    public function showAccount(): Response
    {
        return Inertia::render('Home/Home');
    }

    /**
     * Handle an incoming registration request.
     */
    public function register(RegisterRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->validated('username'),
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
        ]);

        event(new Registered($user));

        $request->session()->regenerate();

        return redirect()->route('verification.notice')->with('status', 'verification-link-sent');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (! $request->user()->hasVerifiedEmail()) {
            return redirect()->route('verification.notice')->with('status', 'verification-required');
        }

        return redirect('/');
    }

    /**
     * Mark the user's email as verified via the signed link.
     */
    public function verifyEmail(User $user, string $hash): RedirectResponse
    {
        abort_if(
            ! hash_equals($hash, sha1($user->getEmailForVerification())),
            403,
        );

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        Auth::login($user);

        return redirect('/');
    }

    /**
     * Resend the email verification notification.
     */
    public function sendVerificationNotification(Request $request): RedirectResponse
    {
        $request->user()->sendEmailVerificationNotification();

        return redirect()->route('verification.notice')->with('status', 'verification-link-sent');
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
