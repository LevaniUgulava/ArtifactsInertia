<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Collection as ProductCollection;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = collect(['Dresses', 'Outerwear', 'Tops', 'Accessories', 'Shoes'])
            ->mapWithKeys(fn (string $name): array => [$name => Category::create(['name' => $name])]);

        $collections = collect([
            ['name' => 'Gucci Edit', 'image' => '/storage/catalog/gucci-fashion-look.jpg'],
            ['name' => 'Trending Now', 'image' => '/storage/catalog/gucci-pink-evening.jpg'],
            ['name' => 'House Signatures', 'image' => '/storage/catalog/gucci-black-evening.jpg'],
            ['name' => 'The Evening Edit', 'image' => '/storage/catalog/gucci-dress-coat.jpg'],
        ])->mapWithKeys(function (array $data): array {
            $collection = ProductCollection::create([
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'image' => $data['image'],
            ]);

            return [$data['name'] => $collection];
        });

        foreach ($this->productDefinitions() as $definition) {
            $product = Product::create([
                'spu' => $definition['spu'],
                'slug' => $definition['slug'],
                'name' => $definition['name'],
                'eyebrow' => $definition['eyebrow'],
                'description' => $definition['description'],
                'badge' => $definition['badge'],
                'sex' => $definition['sex'],
                'benefits' => $definition['benefits'],
                'details' => $definition['details'],
            ]);

            $product->categories()->attach($categories[$definition['category']]);
            $product->collections()->attach(
                collect($definition['collections'])
                    ->map(fn (string $name): int => $collections[$name]->id)
                    ->all(),
            );

            foreach ($definition['colors'] as $color) {
                foreach ($definition['sizes'] as $size) {
                    $variant = $product->variants()->create([
                        'sku' => "GG-{$definition['spu']}-{$color['value']}-{$size}",
                        'color' => $color['value'],
                        'color_label' => $color['label'],
                        'color_hex' => $color['hex'],
                        'size' => $size,
                        'price' => $definition['price'],
                        'stock' => 12,
                    ]);

                    $variant->addMedia($definition['image'])
                        ->preservingOriginal()
                        ->usingName($product->name)
                        ->withCustomProperties(['alt' => $product->name])
                        ->toMediaCollection('images');
                }
            }
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function productDefinitions(): array
    {
        $benefits = [
            ['label' => 'Complimentary shipping on orders over $500', 'icon' => 'truck'],
            ['label' => 'Free returns within 30 days', 'icon' => 'rotate'],
            ['label' => 'Authenticity guaranteed', 'icon' => 'shield'],
        ];
        $details = [
            ['title' => 'Product Details', 'paragraphs' => ['A statement piece cut with the polished ease of the House. Designed for a refined wardrobe and made to be worn season after season.']],
            ['title' => 'Material & Care', 'bullets' => ['Premium Italian fabric', 'Dry clean only', 'Store on a padded hanger']],
            ['title' => 'Fit & Sizing', 'paragraphs' => ['This style runs true to size. Choose your usual size for the intended fit.']],
        ];

        return [
            $this->definition('GG-COAT-001', 'gg-wool-wrap-coat', 'GG Wool Wrap Coat', 'House Signatures', 'A sculpted wool wrap coat with a generous collar and an effortless belted waist, photographed in a rich editorial silhouette.', 'Outerwear', ['Gucci Edit', 'House Signatures'], 'woman', 1295, 'New', 'gucci-portrait-coat.jpg', [['camel', 'Camel', '#c69768'], ['black', 'Black', '#262626']], ['XS', 'S', 'M', 'L'], $benefits, $details),
            $this->definition('GG-DRESS-002', 'gg-emerald-silk-dress', 'GG Emerald Silk Dress', 'The Evening Edit', 'A fluid evening dress with a jewel-toned finish and a graceful line inspired by the drama of an Italian palazzo.', 'Dresses', ['Gucci Edit', 'The Evening Edit'], 'woman', 980, 'Trending', 'gucci-editorial-green.jpg', [['emerald', 'Emerald', '#315c5b'], ['black', 'Black', '#171717']], ['XS', 'S', 'M', 'L'], $benefits, $details),
            $this->definition('GG-DRESS-003', 'gg-rose-evening-gown', 'GG Rose Evening Gown', 'The Evening Edit', 'A romantic rose-toned gown with couture energy, designed for entrances, celebrations, and memorable nights.', 'Dresses', ['Trending Now', 'The Evening Edit'], 'woman', 1480, 'Trending', 'gucci-pink-evening.jpg', [['rose', 'Rose', '#be6f7a'], ['ivory', 'Ivory', '#f5f0e6']], ['XS', 'S', 'M', 'L'], $benefits, $details),
            $this->definition('GG-BLAZER-004', 'gg-black-tailored-blazer', 'GG Black Tailored Blazer', 'House Signatures', 'A sharp black blazer with a long, elegant line that brings modern structure to evening dressing and everyday tailoring.', 'Outerwear', ['Gucci Edit', 'House Signatures'], 'unisex', 890, 'New', 'gucci-black-evening.jpg', [['black', 'Black', '#171717'], ['navy', 'Navy', '#1e3a5f']], ['S', 'M', 'L', 'XL'], $benefits, $details),
            $this->definition('GG-COAT-005', 'gg-draped-evening-coat', 'GG Draped Evening Coat', 'Atelier Evening', 'A long draped coat with an understated, architectural presence and a silhouette made for city nights.', 'Outerwear', ['Trending Now', 'The Evening Edit'], 'unisex', 1190, null, 'gucci-dress-coat.jpg', [['charcoal', 'Charcoal', '#3f3f46'], ['camel', 'Camel', '#c69768']], ['S', 'M', 'L', 'XL'], $benefits, $details),
            $this->definition('GG-LOOK-006', 'gg-runway-silk-look', 'GG Runway Silk Look', 'Gucci Edit', 'A complete silk-forward look balancing soft drape with a confident runway attitude and distinctive styling.', 'Tops', ['Gucci Edit', 'Trending Now'], 'unisex', 720, 'Trending', 'gucci-fashion-look.jpg', [['black', 'Black', '#171717'], ['ivory', 'Ivory', '#f5f0e6']], ['XS', 'S', 'M', 'L', 'XL'], $benefits, $details),
        ];
    }

    /**
     * @param  list<array{0: string, 1: string, 2: string}>  $colors
     * @param  list<string>  $sizes
     * @param  list<array{label: string, icon: string}>  $benefits
     * @param  list<array<string, mixed>>  $details
     * @param  list<string>  $collections
     * @return array<string, mixed>
     */
    private function definition(string $spu, string $slug, string $name, string $eyebrow, string $description, string $category, array $collections, string $sex, int $price, ?string $badge, string $image, array $colors, array $sizes, array $benefits, array $details): array
    {
        return [
            'spu' => $spu,
            'slug' => $slug,
            'name' => $name,
            'eyebrow' => $eyebrow,
            'description' => $description,
            'category' => $category,
            'collections' => $collections,
            'sex' => $sex,
            'price' => $price,
            'badge' => $badge,
            'image' => storage_path("app/public/catalog/{$image}"),
            'colors' => collect($colors)->map(fn (array $color): array => ['value' => $color[0], 'label' => $color[1], 'hex' => $color[2]])->all(),
            'sizes' => $sizes,
            'benefits' => $benefits,
            'details' => $details,
        ];
    }
}
