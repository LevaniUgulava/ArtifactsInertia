<?php

use Database\Seeders\CatalogSeeder;

beforeEach(fn () => $this->seed(CatalogSeeder::class));

it('renders the public product detail page', function () {
    $this->get('/en/products/gg-wool-wrap-coat')
        ->assertInertia(fn ($page) => $page
            ->component('Product/Product')
            ->where('product.slug', 'gg-wool-wrap-coat')
            ->where('product.name', 'GG Wool Wrap Coat')
            ->has('product.images', 1)
            ->has('product.colors', 2)
            ->has('product.colors.0.availableSizes')
            ->has('product.sizes', 4)
        );
});

it('returns not found for an unknown product slug', function () {
    $this->get('/en/products/not-a-real-product')->assertNotFound();
});
