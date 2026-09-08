<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Show the public catalog collection.
     */
    public function index(Request $request): Response
    {
        $sort = $request->string('sort')->toString();
        $sort = in_array($sort, ['newest', 'price-low', 'price-high'], true) ? $sort : 'newest';

        $page = max(1, min($request->integer('page', 1), 8));

        return Inertia::render('Catalog/Catalog', [
            'catalog' => [
                'collection' => [
                    'name' => 'Fall/Winter Collection',
                    'count' => 48,
                    'featured' => [
                        'eyebrow' => 'Featured Collection',
                        'title' => 'The Artisan Edit',
                        'description' => 'Handcrafted pieces from Italian ateliers, designed to transcend seasons.',
                        'image' => 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85',
                    ],
                    'editorial' => [
                        'eyebrow' => 'Editorial',
                        'title' => 'The Art of Layering',
                        'description' => 'Discover how our design team approaches transitional dressing — combining texture, proportion, and intention in every piece.',
                        'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=85',
                    ],
                ],
                'filters' => [
                    'categories' => [
                        ['value' => 'dresses', 'label' => 'Dresses'],
                        ['value' => 'outerwear', 'label' => 'Outerwear'],
                        ['value' => 'tops', 'label' => 'Tops'],
                        ['value' => 'bottoms', 'label' => 'Bottoms'],
                        ['value' => 'knitwear', 'label' => 'Knitwear'],
                    ],
                    'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                    'colors' => [
                        ['value' => 'black', 'label' => 'Black', 'hex' => '#171717'],
                        ['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'],
                        ['value' => 'camel', 'label' => 'Camel', 'hex' => '#a16207'],
                        ['value' => 'teal', 'label' => 'Teal', 'hex' => '#315c5b'],
                        ['value' => 'navy', 'label' => 'Navy', 'hex' => '#1e3a5f'],
                        ['value' => 'red', 'label' => 'Red', 'hex' => '#9f1239'],
                    ],
                    'collections' => ["Women's", "Men's", 'All'],
                ],
                'activeFilters' => [
                    'categories' => $this->queryArray($request, 'category'),
                    'sizes' => $this->queryArray($request, 'size'),
                    'colors' => $this->queryArray($request, 'color'),
                    'collections' => $this->queryArray($request, 'collection'),
                    'minPrice' => $request->integer('minPrice', 50),
                    'maxPrice' => $request->integer('maxPrice', 2500),
                ],
                'sort' => $sort,
                'products' => $this->products(),
                'pagination' => [
                    'currentPage' => $page,
                    'lastPage' => 8,
                    'perPage' => 6,
                    'total' => 48,
                ],
            ],
        ]);
    }

    /**
     * @return list<string>
     */
    private function queryArray(Request $request, string $key): array
    {
        $values = $request->input($key, []);

        return is_array($values) ? array_values(array_filter($values, 'is_string')) : [];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function products(): array
    {
        return [
            [
                'id' => 'structured-wool-overcoat',
                'name' => 'Structured Wool Overcoat',
                'category' => 'Outerwear',
                'collection' => "Men's",
                'price' => '$1,290',
                'badge' => 'New',
                'colors' => ['#262626'],
                'image' => 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85',
            ],
            [
                'id' => 'pearl-button-silk-blouse',
                'name' => 'Pearl Button Silk Blouse',
                'category' => 'Tops',
                'collection' => "Women's",
                'price' => '$485',
                'badge' => 'Trending',
                'colors' => ['#f5f0e6', '#171717'],
                'image' => 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85',
            ],
            [
                'id' => 'cashmere-turtleneck',
                'name' => 'Cashmere Turtleneck',
                'category' => 'Knitwear',
                'collection' => "Women's",
                'price' => '$620',
                'colors' => ['#315c5b', '#9f1239'],
                'image' => 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=85',
            ],
            [
                'id' => 'pinstripe-tailored-blazer',
                'name' => 'Pinstripe Tailored Blazer',
                'category' => 'Outerwear',
                'collection' => "Men's",
                'price' => '$890',
                'badge' => 'New',
                'colors' => ['#171717', '#1e3a5f'],
                'image' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
            ],
            [
                'id' => 'pleated-midi-skirt',
                'name' => 'Pleated Midi Skirt',
                'category' => 'Bottoms',
                'collection' => "Women's",
                'price' => '$420',
                'colors' => ['#c69768', '#f5f0e6', '#315c5b'],
                'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',
            ],
            [
                'id' => 'belted-camel-trench',
                'name' => 'Belted Camel Trench',
                'category' => 'Outerwear',
                'collection' => "Men's",
                'price' => '$1,450',
                'badge' => 'Trending',
                'colors' => ['#c69768', '#262626'],
                'image' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
            ],
        ];
    }
}
