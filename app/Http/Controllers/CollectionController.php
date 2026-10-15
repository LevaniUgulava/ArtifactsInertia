<?php

namespace App\Http\Controllers;

use App\Http\Requests\CollectionRequest;
use App\Http\Resources\Admin\CollectionResource;
use App\Models\Collection;
use App\Models\Product;
use App\Services\AdminService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CollectionController extends Controller
{
    public function __construct(private readonly AdminService $adminService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Collections/Collections', [
            'resource' => 'collections',
            'title' => 'Collections',
            'description' => 'Curate the editorial groups shown across the storefront.',
            'records' => CollectionResource::collection($this->adminService->collectionIndexData())->resolve(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Collections/Form', $this->formProps());
    }

    public function store(CollectionRequest $request): RedirectResponse
    {
        $this->adminService->saveCollection(new Collection, $request->validated());

        return Redirect::route('admin.collections.index')->with('success', 'Collection created.');
    }

    public function edit(Collection $collection): Response
    {
        return Inertia::render('Admin/Collections/Form', $this->formProps($collection));
    }

    public function update(CollectionRequest $request, Collection $collection): RedirectResponse
    {
        $this->adminService->saveCollection($collection, $request->validated());

        return Redirect::route('admin.collections.index')->with('success', 'Collection updated.');
    }

    public function destroy(Collection $collection): RedirectResponse
    {
        $this->adminService->deleteCollection($collection);

        return Redirect::route('admin.collections.index')->with('success', 'Collection deleted.');
    }

    /**
     * @return array{resource: string, title: string, values: array, products: \Illuminate\Database\Eloquent\Collection<int, Product>, recordId?: int}
     */
    private function formProps(?Collection $collection = null): array
    {
        return [
            'resource' => 'collections',
            'title' => $collection === null ? 'Create collection' : 'Edit collection',
            'values' => $this->adminService->collectionFormData($collection),
            'products' => Product::query()->orderBy('name')->get(['id', 'name']),
            'recordId' => $collection?->id,
        ];
    }
}
