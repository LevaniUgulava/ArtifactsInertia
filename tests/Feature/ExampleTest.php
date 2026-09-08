<?php

it('redirects the root to the default locale', function () {
    $this->get('/')->assertRedirect('/en');
});
