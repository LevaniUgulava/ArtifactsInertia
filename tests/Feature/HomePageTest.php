<?php

test('renders the Inertia home page', function () {
    $response = $this->get('/');

    $response->assertInertia(fn ($page) => $page->component('Home/Home'));
});
