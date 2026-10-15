<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\Admin\ProductsResource;
use App\Http\Resources\Product\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Services\AdminService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(private readonly AdminService $adminService) {}

    /**
     * Show a public product detail page.
     */
    public function show(Request $request, string $product): Response
    {
        $productModel = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->where('slug', $product)
            ->firstOrFail();

        return Inertia::render('Product/Product', [
            'product' => (new ProductResource($productModel))->resolve(),
            'favorited' => $request->user()?->favorites()->where('product_id', $productModel->id)->exists() ?? false,
        ]);
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Products/Products', [
            'resource' => 'products',
            'title' => 'Products',
            'description' => 'Manage the products and variants available in the storefront.',
            'records' => ProductsResource::collection($this->adminService->productIndexData())->resolve(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Form', $this->formProps());
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $this->adminService->saveProduct(new Product, $request->validated());

        return Redirect::route('admin.products.index')->with('success', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Form', $this->formProps($product));
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $this->adminService->saveProduct($product, $request->validated());

        return Redirect::route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->adminService->deleteProduct($product);

        return Redirect::route('admin.products.index')->with('success', 'Product deleted.');
    }

    /**
     * @return array{title: string, categories: Collection<int, Category>, values: array, recordId?: int}
     */
    private function formProps(?Product $product = null): array
    {
        return [
            'title' => $product === null ? 'Create product' : 'Edit product',
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'values' => $this->adminService->productFormData($product),
            'recordId' => $product?->id,
        ];
    }
}
