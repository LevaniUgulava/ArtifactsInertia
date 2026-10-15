<?php

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\User;

it('renders every admin catalog destination for a verified user', function (string $uri, string $component) {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->get($uri)
        ->assertInertia(fn ($page) => $page->component($component));
})->with([
    'products' => ['/admin/products', 'Admin/Products/Products'],
    'categories' => ['/admin/categories', 'Admin/Categories/Categories'],
    'collections' => ['/admin/collections', 'Admin/Collections/Collections'],
    'media' => ['/admin/media', 'Admin/Media/Media'],
]);

it('creates a category from the admin form', function () {
    $user = User::factory()->admin()->create();

    $this->actingAs($user)
        ->post('/admin/categories', ['name' => 'Outerwear'])
        ->assertRedirect('/admin/categories');

    expect(Category::where('name', 'Outerwear')->exists())->toBeTrue();
});

it('creates a collection and synchronizes its products', function () {
    $user = User::factory()->admin()->create();
    $product = Product::factory()->create();

    $this->actingAs($user)
        ->post('/admin/collections', [
            'name' => 'Winter edit',
            'slug' => 'winter-edit',
            'product_ids' => [$product->id],
        ])
        ->assertRedirect('/admin/collections');

    $collection = Collection::where('slug', 'winter-edit')->firstOrFail();

    expect($collection->products()->whereKey($product)->exists())->toBeTrue();
});

it('creates a product with a variant and category assignment', function () {
    $user = User::factory()->admin()->create();
    $category = Category::create(['name' => 'Tops']);

    $this->actingAs($user)
        ->post('/admin/products', [
            'spu' => 'SPU-ADMIN-001',
            'slug' => 'admin-shirt',
            'name' => 'Admin Shirt',
            'eyebrow' => 'Everyday layer',
            'description' => 'A product created from the admin panel.',
            'badge' => '',
            'sex' => 'unisex',
            'category_ids' => [$category->id],
            'benefits' => [],
            'details' => [],
            'variants' => [[
                'sku' => 'SKU-ADMIN-001',
                'color' => 'navy',
                'color_label' => 'Navy',
                'color_hex' => '#000080',
                'size' => 'M',
                'price' => '120.00',
                'stock' => 8,
            ]],
        ])
        ->assertRedirect('/admin/products');

    $product = Product::where('slug', 'admin-shirt')->firstOrFail();

    expect($product->categories()->whereKey($category)->exists())->toBeTrue()
        ->and($product->variants()->where('sku', 'SKU-ADMIN-001')->exists())->toBeTrue();
});
