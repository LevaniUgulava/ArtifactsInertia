<?php

test('renders the Inertia home page', function () {
    $response = $this->get('/en');

    $response->assertInertia(fn ($page) => $page->component('Home/Home'));
});
