<?php

use App\Models\Product;
use Database\Seeders\CatalogSeeder;

beforeEach(fn () => $this->seed(CatalogSeeder::class));

it('renders the public catalog page with all products when no collection filter is set', function () {
    $this->get('/en/catalog')
        ->assertInertia(fn ($page) => $page
            ->component('Catalog/Catalog')
            ->where('catalog.collection.name', '')
            ->has('catalog.products', 6)
            ->has('catalog.filters.categories', 5)
            ->where('catalog.pagination.currentPage', 1)
            ->where('catalog.pagination.total', 6));
});

it('renders catalog filtered by collection slug', function () {
    $this->get('/en/catalog?collection=gucci-edit')
        ->assertInertia(fn ($page) => $page
            ->component('Catalog/Catalog')
            ->where('catalog.collection.name', 'Gucci Edit')
            ->has('catalog.products', 4));
});

it('filters and sorts products from supported catalog query state', function () {
    $this->get('/en/catalog?sort=price-high&page=2&category[]=outerwear&color[]=camel')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.sort', 'price-high')
            ->where('catalog.pagination.total', 2)
            ->where('catalog.activeFilters.categories', ['outerwear'])
            ->where('catalog.activeFilters.colors', ['camel']));
});

it('filters products by size', function () {
    $productsWithSize = Product::query()
        ->whereHas('variants', fn ($query) => $query->where('size', 'XL'))
        ->count();

    $this->get('/en/catalog?size[]=XL')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.activeFilters.sizes', ['XL'])
            ->where('catalog.pagination.total', $productsWithSize));
});

it('filters products by collection from the sidebar', function () {
    $this->get('/en/catalog?collection[]=trending-now')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.collection.name', '')
            ->where('catalog.activeFilters.collections', ['trending-now'])
            ->where('catalog.pagination.total', 3));
});

it('falls back to safe catalog defaults for unsupported query state', function () {
    $this->get('/en/catalog?sort=invalid&page=999')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.sort', 'newest')
            ->has('catalog.products', 0));
});

it('filters products by search query', function () {
    $this->get('/en/catalog?q=emerald')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.search', 'emerald')
            ->where('catalog.pagination.total', 1)
            ->where('catalog.products.0.name', 'GG Emerald Silk Dress'));
});

it('returns no products for an unmatched search query', function () {
    $this->get('/en/catalog?q=zzzznomatch')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.search', 'zzzznomatch')
            ->where('catalog.pagination.total', 0));
});
