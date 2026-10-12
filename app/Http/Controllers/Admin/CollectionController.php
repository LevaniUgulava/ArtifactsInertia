<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CollectionRequest;
use App\Models\Collection;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CollectionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ResourceIndex', [
            'resource' => 'collections',
            'title' => 'Collections',
            'description' => 'Curate the editorial groups shown across the storefront.',
            'records' => Collection::query()->withCount('products')->orderBy('name')->get(['id', 'name', 'slug'])->map(fn (Collection $collection): array => [
                'id' => $collection->id,
                'name' => $collection->name,
                'meta' => $collection->slug.' · '.$collection->products_count.' products',
            ])->all(),
        ]);
    }

    public function create(): Response
    {
        return $this->form();
    }

    public function store(CollectionRequest $request): RedirectResponse
    {
        $collection = Collection::create($request->safe()->only(['name', 'slug']));
        $collection->products()->sync($request->validated('product_ids', []));

        return Redirect::route('admin.collections.index')->with('success', 'Collection created.');
    }

    public function edit(Collection $collection): Response
    {
        return $this->form($collection);
    }

    public function update(CollectionRequest $request, Collection $collection): RedirectResponse
    {
        $collection->update($request->safe()->only(['name', 'slug']));
        $collection->products()->sync($request->validated('product_ids', []));

        return Redirect::route('admin.collections.index')->with('success', 'Collection updated.');
    }

    public function destroy(Collection $collection): RedirectResponse
    {
        $collection->delete();

        return Redirect::route('admin.collections.index')->with('success', 'Collection deleted.');
    }

    private function form(?Collection $collection = null): Response
    {
        return Inertia::render('Admin/ResourceForm', [
            'resource' => 'collections',
            'title' => $collection === null ? 'Create collection' : 'Edit collection',
            'values' => [
                'name' => $collection?->name ?? '',
                'slug' => $collection?->slug ?? '',
                'product_ids' => $collection?->products()->pluck('products.id')->all() ?? [],
            ],
            'products' => Product::query()->orderBy('name')->get(['id', 'name']),
            'recordId' => $collection?->id,
        ]);
    }
}
