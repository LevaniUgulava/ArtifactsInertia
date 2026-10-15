<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Services\AdminService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(private readonly AdminService $adminService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Categories/Categories', [
            'resource' => 'categories',
            'title' => 'Categories',
            'description' => 'Organize products into storefront categories.',
            'records' => CategoryResource::collection($this->adminService->categoryIndexData())->resolve(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Form', $this->formProps());
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $this->adminService->saveCategory(new Category, $request->validated());

        return Redirect::route('admin.categories.index')->with('success', 'Category created.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Form', $this->formProps($category));
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $this->adminService->saveCategory($category, $request->validated());

        return Redirect::route('admin.categories.index')->with('success', 'Category updated.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->adminService->deleteCategory($category);

        return Redirect::route('admin.categories.index')->with('success', 'Category deleted.');
    }

    /**
     * @return array{resource: string, title: string, values: array, recordId?: int}
     */
    private function formProps(?Category $category = null): array
    {
        return [
            'resource' => 'categories',
            'title' => $category === null ? 'Create category' : 'Edit category',
            'values' => ['name' => $category?->name ?? ''],
            'recordId' => $category?->id,
        ];
    }
}
