<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ResourceIndex', [
            'resource' => 'products',
            'title' => 'Products',
            'description' => 'Manage the products and variants available in the storefront.',
            'records' => Product::query()->withCount('variants')->with('categories:id,name')->latest()->get()->map(fn (Product $product): array => [
                'id' => $product->id,
                'name' => $product->name,
                'meta' => $product->spu.' · '.$product->variants_count.' variants',
                'detail' => $product->categories->pluck('name')->implode(', '),
            ])->all(),
        ]);
    }

    public function create(): Response
    {
        return $this->form();
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $this->saveProduct(new Product, $request);

        return Redirect::route('admin.products.index')->with('success', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        return $this->form($product);
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $this->saveProduct($product, $request);

        return Redirect::route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return Redirect::route('admin.products.index')->with('success', 'Product deleted.');
    }

    private function form(?Product $product = null): Response
    {
        $product?->load('variants', 'categories:id,name');

        return Inertia::render('Admin/ProductForm', [
            'title' => $product === null ? 'Create product' : 'Edit product',
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'values' => [
                'spu' => $product?->spu ?? '',
                'slug' => $product?->slug ?? '',
                'name' => $product?->name ?? '',
                'eyebrow' => $product?->eyebrow ?? '',
                'description' => $product?->description ?? '',
                'badge' => $product?->badge ?? '',
                'sex' => $product?->sex ?? 'unisex',
                'category_ids' => $product?->categories->pluck('id')->all() ?? [],
                'benefits' => $product?->benefits ?? [],
                'details' => $product?->details ?? [],
                'variants' => $product?->variants->map(fn ($variant): array => [
                    'sku' => $variant->sku,
                    'color' => $variant->color,
                    'color_label' => $variant->color_label,
                    'color_hex' => $variant->color_hex,
                    'size' => $variant->size,
                    'price' => (string) $variant->price,
                    'stock' => $variant->stock,
                ])->all() ?? [['sku' => '', 'color' => '', 'color_label' => '', 'color_hex' => '#000000', 'size' => '', 'price' => '', 'stock' => 0]],
            ],
            'recordId' => $product?->id,
        ]);
    }

    private function saveProduct(Product $product, ProductRequest $request): void
    {
        $data = $request->validated();

        DB::transaction(function () use ($product, $data): void {
            $product->fill(collect($data)->except(['category_ids', 'variants'])->all());
            $product->save();
            $product->categories()->sync($data['category_ids'] ?? []);
            $product->variants()->delete();
            $product->variants()->createMany($data['variants']);
        });
    }
}
