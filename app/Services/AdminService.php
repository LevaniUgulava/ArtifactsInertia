<?php

namespace App\Services;

use App\Http\Resources\Admin\VariantResource;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AdminService
{
    /**
     * @return array{stats: array{products: int, variants: int, categories: int, collections: int}, inventory: array{lowStock: int, outOfStock: int}, recentProducts: EloquentCollection<int, Product>}
     */
    public function dashboardData(): array
    {
        return [
            'stats' => [
                'products' => Product::count(),
                'variants' => Variant::count(),
                'categories' => Category::count(),
                'collections' => Collection::count(),
            ],
            'inventory' => [
                'lowStock' => Variant::whereBetween('stock', [1, 5])->count(),
                'outOfStock' => Variant::where('stock', 0)->count(),
            ],
            'recentProducts' => Product::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'slug']),
        ];
    }

    /**
     * @return EloquentCollection<int, Product>
     */
    public function productIndexData(): EloquentCollection
    {
        return Product::query()
            ->withCount('variants')
            ->with(['categories:id,name', 'variants' => fn ($q) => $q->with('media')->orderBy('id')])
            ->latest()
            ->get();
    }

    /**
     * @return EloquentCollection<int, Category>
     */
    public function categoryIndexData(): EloquentCollection
    {
        return Category::query()
            ->withCount('products')
            ->orderBy('name')
            ->get(['id', 'name']);
    }

    /**
     * @return EloquentCollection<int, Collection>
     */
    public function collectionIndexData(): EloquentCollection
    {
        return Collection::query()
            ->with('media')
            ->withCount('products')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);
    }

    /**
     * @return array{spu: string, slug: string, name: string, eyebrow: string, description: string, badge: string, sex: string, category_ids: list<int>, benefits: array, details: array, variants: list<array{sku: string, color: string, color_label: string, color_hex: string, size: string, price: string, stock: int}>}
     */
    public function productFormData(?Product $product = null): array
    {
        $product?->load('variants', 'categories:id,name');

        return [
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
            'variants' => $product !== null && $product->variants->isNotEmpty()
                ? VariantResource::collection($product->variants)->resolve()
                : [$this->emptyVariant()],
        ];
    }

    /**
     * @return array{name: string, slug: string, product_ids: list<int>}
     */
    public function collectionFormData(?Collection $collection = null): array
    {
        return [
            'name' => $collection?->name ?? '',
            'slug' => $collection?->slug ?? '',
            'product_ids' => $collection?->products()->pluck('products.id')->all() ?? [],
        ];
    }

    public function saveProduct(Product $product, array $data): void
    {
        DB::transaction(function () use ($product, $data): void {
            $product->fill(collect($data)->except(['category_ids', 'variants'])->all());
            $product->save();
            $product->categories()->sync($data['category_ids'] ?? []);
            $product->variants()->delete();
            $product->variants()->createMany($data['variants']);
        });
    }

    public function saveCollection(Collection $collection, array $data): void
    {
        DB::transaction(function () use ($collection, $data): void {
            $collection->fill(collect($data)->only(['name', 'slug'])->all());
            $collection->save();
            $collection->products()->sync($data['product_ids'] ?? []);
        });
    }

    public function saveCategory(Category $category, array $data): void
    {
        $category->fill($data);
        $category->save();
    }

    public function deleteProduct(Product $product): void
    {
        $product->delete();
    }

    public function deleteCategory(Category $category): void
    {
        $category->delete();
    }

    public function deleteCollection(Collection $collection): void
    {
        $collection->delete();
    }

    public function mediaIndexData(): LengthAwarePaginator
    {
        return Media::query()->latest()->paginate(24)->through(fn (Media $item): array => [
            'id' => $item->id,
            'name' => $item->name,
            'fileName' => $item->file_name,
            'mimeType' => $item->mime_type,
            'url' => $item->getUrl(),
            'modelType' => class_basename($item->model_type),
        ]);
    }

    /**
     * @return array{sku: string, color: string, color_label: string, color_hex: string, size: string, price: string, stock: int}
     */
    private function emptyVariant(): array
    {
        return [
            'sku' => '',
            'color' => '',
            'color_label' => '',
            'color_hex' => '#000000',
            'size' => '',
            'price' => '',
            'stock' => 0,
        ];
    }
}
