<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Collection as ProductCollection;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = collect(['Dresses', 'Outerwear', 'Tops', 'Knitwear', 'Bottoms'])
            ->mapWithKeys(fn (string $name): array => [$name => Category::firstOrCreate(['name' => $name])]);

        $collections = collect([
            ['name' => 'Essentials', 'image' => '/storage/catalog/frock-coat.jpg'],
            ['name' => "Women's", 'image' => '/storage/catalog/dress.jpg'],
            ['name' => "Men's", 'image' => '/storage/catalog/evening-coat.jpg'],
            ['name' => 'Fall/Winter Collection', 'image' => '/storage/catalog/summer-dress.jpg'],
        ])->mapWithKeys(function (array $data): array {
            $collection = ProductCollection::updateOrCreate(['slug' => Str::slug($data['name'])], $data);

            return [$data['name'] => $collection];
        });

        $products = $this->productDefinitions();

        foreach ($products as $definition) {
            $product = Product::updateOrCreate(
                ['slug' => $definition['slug']],
                [
                    'spu' => Str::upper(Str::substr(Str::slug($definition['slug'], ''), 0, 12)),
                    'name' => $definition['name'],
                    'eyebrow' => $definition['eyebrow'],
                    'description' => $definition['description'],
                    'badge' => $definition['badge'] ?? null,
                    'sex' => $definition['sex'] ?? 'unisex',
                    'benefits' => $definition['benefits'],
                    'details' => $definition['details'],
                ],
            );

            $product->categories()->sync([$categories[$definition['category']]->id]);
            $product->collections()->sync(collect($definition['collections'])->map(fn (string $name): int => $collections[$name]->id));
            $product->variants()
                ->whereNotIn('size', $definition['sizes'])
                ->get()
                ->each(function (Variant $variant): void {
                    $variant->clearMediaCollection('images');
                    $variant->delete();
                });

            foreach ($definition['colors'] as $color) {
                foreach ($definition['sizes'] as $size) {
                    $variant = $product->variants()->updateOrCreate(
                        ['color' => $color['value'], 'size' => $size],
                        [
                            'sku' => Str::upper("{$definition['slug']}-{$color['value']}-{$size}"),
                            'color_label' => $color['label'],
                            'color_hex' => $color['hex'],
                            'price' => $definition['price'],
                            'stock' => 10,
                        ],
                    );

                    $this->seedVariantImages($variant, $definition['images'], $product->name);
                }
            }
        }
    }

    /** @param list<string> $imageUrls */
    private function seedVariantImages(Variant $variant, array $imageUrls, string $productName): void
    {
        $variant->clearMediaCollection('images');

        foreach ($imageUrls as $order => $imageUrl) {
            $variant->addMedia($imageUrl)
                ->preservingOriginal()
                ->usingName($productName)
                ->withCustomProperties(['alt' => $productName])
                ->setOrder($order + 1)
                ->toMediaCollection('images');
        }
    }

    /** @return list<array<string, mixed>> */
    private function productDefinitions(): array
    {
        $images = [
            storage_path('app/public/catalog/frock-coat.jpg'),
            storage_path('app/public/catalog/evening-coat.jpg'),
            storage_path('app/public/catalog/blouse.jpg'),
            storage_path('app/public/catalog/work-blouse.jpg'),
        ];
        $localImages = [
            'overcoat' => storage_path('app/public/catalog/evening-coat.jpg'),
            'blouse' => storage_path('app/public/catalog/blouse.jpg'),
            'turtleneck' => storage_path('app/public/catalog/work-blouse.jpg'),
            'blazer' => storage_path('app/public/catalog/frock-coat.jpg'),
            'skirt' => storage_path('app/public/catalog/dress.jpg'),
            'trench' => storage_path('app/public/catalog/evening-coat.jpg'),
        ];
        $benefits = [
            ['label' => 'Complimentary shipping on orders over $500', 'icon' => 'truck'],
            ['label' => 'Free returns within 30 days', 'icon' => 'rotate'],
            ['label' => 'Authenticity guaranteed', 'icon' => 'shield'],
        ];
        $genericDetails = [['title' => 'Product Details', 'paragraphs' => ['Designed to become a dependable part of your seasonal wardrobe, with refined proportions and premium finishing.']], ['title' => 'Material & Care', 'bullets' => ['Premium seasonal fabric', 'Dry clean only', 'Store on a padded hanger']], ['title' => 'Fit & Sizing', 'paragraphs' => ['This style runs true to size. Choose your usual size for the intended fit.']]];

        $products = [
            ['slug' => 'cashmere-wrap-coat', 'name' => 'Cashmere Wrap Coat', 'category' => 'Outerwear', 'collections' => ['Essentials', "Women's"], 'sex' => 'woman', 'price' => 1295, 'badge' => null, 'eyebrow' => 'Atelier Street Essentials', 'description' => 'An investment piece crafted from pure Italian cashmere. This wrap coat offers timeless elegance with its wide lapels, self-tie belt, and a relaxed yet refined silhouette that layers beautifully over any outfit.', 'colors' => [['value' => 'camel', 'label' => 'Camel', 'hex' => '#c69768'], ['value' => 'black', 'label' => 'Black', 'hex' => '#262626'], ['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'], ['value' => 'burgundy', 'label' => 'Burgundy', 'hex' => '#6b3035']],             'sizes' => ['XS', 'S', 'M', 'L', 'XL'], 'images' => $images, 'benefits' => $benefits, 'details' => $genericDetails],
            ['slug' => 'structured-wool-overcoat', 'name' => 'Structured Wool Overcoat', 'category' => 'Outerwear', 'collections' => ["Men's", 'Fall/Winter Collection'], 'sex' => 'man', 'price' => 1290, 'badge' => 'New', 'colors' => [['value' => 'charcoal', 'label' => 'Charcoal', 'hex' => '#262626']], 'sizes' => ['S', 'M', 'L', 'XL'], 'images' => [$localImages['overcoat'], ...array_slice($images, 1, 2)]],
            ['slug' => 'pearl-button-silk-blouse', 'name' => 'Pearl Button Silk Blouse', 'category' => 'Tops', 'collections' => ["Women's", 'Fall/Winter Collection'], 'sex' => 'woman', 'price' => 485, 'badge' => 'Trending', 'colors' => [['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'], ['value' => 'black', 'label' => 'Black', 'hex' => '#171717']], 'sizes' => ['XS', 'S', 'M', 'L'], 'images' => [$localImages['blouse'], ...array_slice($images, 0, 2)]],
            ['slug' => 'cashmere-turtleneck', 'name' => 'Cashmere Turtleneck', 'category' => 'Knitwear', 'collections' => ["Women's", 'Fall/Winter Collection'], 'sex' => 'woman', 'price' => 620, 'badge' => null, 'colors' => [['value' => 'teal', 'label' => 'Teal', 'hex' => '#315c5b'], ['value' => 'red', 'label' => 'Red', 'hex' => '#9f1239']], 'sizes' => ['XS', 'S', 'M', 'L', 'XL'], 'images' => [$localImages['turtleneck'], ...array_slice($images, 0, 1)]],
            ['slug' => 'pinstripe-tailored-blazer', 'name' => 'Pinstripe Tailored Blazer', 'category' => 'Outerwear', 'collections' => ["Men's", 'Fall/Winter Collection'], 'sex' => 'man', 'price' => 890, 'badge' => 'New', 'colors' => [['value' => 'black', 'label' => 'Black', 'hex' => '#171717'], ['value' => 'navy', 'label' => 'Navy', 'hex' => '#1e3a5f']], 'sizes' => ['S', 'M', 'L', 'XL'], 'images' => [$localImages['blazer'], ...array_slice($images, 0, 1)]],
            ['slug' => 'pleated-midi-skirt', 'name' => 'Pleated Midi Skirt', 'category' => 'Bottoms', 'collections' => ["Women's", 'Fall/Winter Collection'], 'sex' => 'woman', 'price' => 420, 'badge' => null, 'colors' => [['value' => 'camel', 'label' => 'Camel', 'hex' => '#c69768'], ['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'], ['value' => 'teal', 'label' => 'Teal', 'hex' => '#315c5b']], 'sizes' => ['XS', 'S', 'M', 'L'], 'images' => [$localImages['skirt'], ...array_slice($images, 0, 1)]],
            ['slug' => 'belted-camel-trench', 'name' => 'Belted Camel Trench', 'category' => 'Outerwear', 'collections' => ["Men's", 'Fall/Winter Collection'], 'sex' => 'man', 'price' => 1450, 'badge' => 'Trending', 'colors' => [['value' => 'camel', 'label' => 'Camel', 'hex' => '#c69768'], ['value' => 'black', 'label' => 'Black', 'hex' => '#262626']], 'sizes' => ['S', 'M', 'L', 'XL'], 'images' => [$localImages['trench'], ...array_slice($images, 0, 2)]],
        ];

        foreach ($products as &$product) {
            $product['eyebrow'] ??= 'Atelier Street Collection';
            $product['description'] ??= 'A considered Atelier Street layer designed with refined proportions, premium materials, and everyday versatility.';
            $product['benefits'] ??= $benefits;
            $product['details'] ??= $genericDetails;
        }
        unset($product);

        return $products;
    }
}
