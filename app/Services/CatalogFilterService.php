<?php

namespace App\Services;

use Illuminate\Http\Request;

class CatalogFilterService
{
    /**
     * Resolve catalog query state from the request.
     *
     * @return array{
     *     sort: string,
     *     page: int,
     *     search: string,
     *     collection: string,
     *     activeFilters: array{
     *         categories: list<string>,
     *         sizes: list<string>,
     *         colors: list<string>,
     *         collections: list<string>,
     *         minPrice: int,
     *         maxPrice: int,
     *     }
     * }
     */
    public function from(Request $request): array
    {
        $sort = $request->string('sort')->toString();
        $sort = in_array($sort, ['newest', 'price-low', 'price-high'], true) ? $sort : 'newest';

        $collectionParam = $request->input('collection');
        $collections = is_array($collectionParam)
            ? $this->queryArray($request, 'collection')
            : (is_string($collectionParam) && $collectionParam !== '' ? [$collectionParam] : []);

        return [
            'sort' => $sort,
            'page' => max(1, $request->integer('page', 1)),
            'search' => $request->string('q')->trim()->toString(),
            'collection' => is_string($collectionParam) ? $collectionParam : '',
            'activeFilters' => [
                'categories' => $this->queryArray($request, 'category'),
                'sizes' => $this->queryArray($request, 'size'),
                'colors' => $this->queryArray($request, 'color'),
                'collections' => array_values(array_unique($collections)),
                'minPrice' => $request->integer('minPrice', 50),
                'maxPrice' => $request->integer('maxPrice', 2500),
            ],
        ];
    }

    /**
     * Extract a repeatable query-array parameter as a flat list of strings.
     *
     * @return list<string>
     */
    private function queryArray(Request $request, string $key): array
    {
        $values = $request->input($key, []);

        return is_array($values) ? array_values(array_filter($values, 'is_string')) : [];
    }
}
