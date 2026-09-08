<?php

test('renders the login page', function () {
    $response = $this->get('/login');

    $response->assertInertia(fn ($page) => $page->component('Auth/Login'));
});

test('renders the registration page', function () {
    $response = $this->get('/register');

    $response->assertInertia(fn ($page) => $page->component('Auth/Register'));
});

test('renders the verification page', function () {
    $response = $this->get('/verification');

    $response->assertInertia(fn ($page) => $page->component('Auth/Verification'));
});

test('renders the update password page', function () {
    $response = $this->get('/password/update');

    $response->assertInertia(fn ($page) => $page->component('Auth/UpdatePassword'));
});
