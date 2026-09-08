<?php

it('renders the public catalog page with collection products and filters', function () {
    $this->get('/en/catalog')
        ->assertInertia(fn ($page) => $page
            ->component('Catalog/Catalog')
            ->where('catalog.collection.name', 'Fall/Winter Collection')
            ->has('catalog.products', 6)
            ->has('catalog.filters.categories', 5)
            ->where('catalog.pagination.currentPage', 1));
});

it('preserves supported catalog query state', function () {
    $this->get('/en/catalog?sort=price-high&page=3&category[]=outerwear&color[]=camel')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.sort', 'price-high')
            ->where('catalog.pagination.currentPage', 3)
            ->where('catalog.activeFilters.categories', ['outerwear'])
            ->where('catalog.activeFilters.colors', ['camel']));
});

it('falls back to safe catalog defaults for unsupported query state', function () {
    $this->get('/en/catalog?sort=invalid&page=999')
        ->assertInertia(fn ($page) => $page
            ->where('catalog.sort', 'newest')
            ->where('catalog.pagination.currentPage', 8));
});
