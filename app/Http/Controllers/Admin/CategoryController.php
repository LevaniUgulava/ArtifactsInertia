<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ResourceIndex', [
            'resource' => 'categories',
            'title' => 'Categories',
            'description' => 'Organize products into storefront categories.',
            'records' => Category::query()->withCount('products')->orderBy('name')->get(['id', 'name'])->map(fn (Category $category): array => [
                'id' => $category->id,
                'name' => $category->name,
                'meta' => $category->products_count.' products',
            ])->all(),
        ]);
    }

    public function create(): Response
    {
        return $this->form();
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());

        return Redirect::route('admin.categories.index')->with('success', 'Category created.');
    }

    public function edit(Category $category): Response
    {
        return $this->form($category);
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return Redirect::route('admin.categories.index')->with('success', 'Category updated.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return Redirect::route('admin.categories.index')->with('success', 'Category deleted.');
    }

    private function form(?Category $category = null): Response
    {
        return Inertia::render('Admin/ResourceForm', [
            'resource' => 'categories',
            'title' => $category === null ? 'Create category' : 'Edit category',
            'values' => ['name' => $category?->name ?? ''],
            'recordId' => $category?->id,
        ]);
    }
}
