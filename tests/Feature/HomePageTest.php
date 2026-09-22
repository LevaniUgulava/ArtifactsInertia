<?php

test('renders the Inertia home page', function () {
    $response = $this->get('/en');

    $response->assertInertia(fn ($page) => $page->component('Home/Home'));
});

test('includes the ARTIFACTS favicon in the application shell', function () {
    $response = $this->get('/en');

    $response->assertSee('branding/artifacts-mark.png');
});
