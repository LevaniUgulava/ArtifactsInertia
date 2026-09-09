<?php

use Database\Seeders\CatalogSeeder;

beforeEach(fn () => $this->seed(CatalogSeeder::class));

it('renders the public product detail page', function () {
    $this->get('/en/products/cashmere-wrap-coat')
        ->assertInertia(fn ($page) => $page
            ->component('Product/Product')
            ->where('product.slug', 'cashmere-wrap-coat')
            ->where('product.name', 'Cashmere Wrap Coat')
            ->has('product.images', 4)
            ->has('product.colors', 4)
            ->has('product.sizes', 5)
        );
});

it('returns not found for an unknown product slug', function () {
    $this->get('/en/products/not-a-real-product')->assertNotFound();
});
