<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Show a public product detail page.
     */
    public function show(string $product): Response
    {
        $products = $this->products();

        abort_unless(array_key_exists($product, $products), 404);

        return Inertia::render('Product/Product', [
            'product' => $products[$product],
        ]);
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private function products(): array
    {
        $products = [
            'cashmere-wrap-coat' => [
                'slug' => 'cashmere-wrap-coat',
                'name' => 'Cashmere Wrap Coat',
                'eyebrow' => 'Atelier Street Essentials',
                'category' => "Women's Outerwear",
                'collection' => 'Essentials',
                'price' => '$1,295.00',
                'description' => 'An investment piece crafted from pure Italian cashmere. This wrap coat offers timeless elegance with its wide lapels, self-tie belt, and a relaxed yet refined silhouette that layers beautifully over any outfit.',
                'images' => [
                    ['src' => 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85', 'alt' => 'Model wearing the cashmere wrap coat'],
                    ['src' => 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=640&q=85', 'alt' => 'Close view of the cashmere wrap coat fabric'],
                    ['src' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=640&q=85', 'alt' => 'Back view of the cashmere wrap coat'],
                    ['src' => 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=640&q=85', 'alt' => 'Model showing the coat silhouette'],
                ],
                'colors' => [
                    ['value' => 'camel', 'label' => 'Camel', 'hex' => '#c69768'],
                    ['value' => 'black', 'label' => 'Black', 'hex' => '#262626'],
                    ['value' => 'ivory', 'label' => 'Ivory', 'hex' => '#f5f0e6'],
                    ['value' => 'burgundy', 'label' => 'Burgundy', 'hex' => '#6b3035'],
                ],
                'sizes' => [
                    ['value' => 'XS', 'available' => true],
                    ['value' => 'S', 'available' => true],
                    ['value' => 'M', 'available' => true],
                    ['value' => 'L', 'available' => true],
                    ['value' => 'XL', 'available' => true],
                ],
                'benefits' => [
                    ['label' => 'Complimentary shipping on orders over $500', 'icon' => 'truck'],
                    ['label' => 'Free returns within 30 days', 'icon' => 'rotate'],
                    ['label' => 'Authenticity guaranteed', 'icon' => 'shield'],
                ],
                'details' => [
                    [
                        'title' => 'Product Details',
                        'paragraphs' => [
                            'This wrap coat is meticulously constructed from 100% Grade-A Italian cashmere, sourced from the finest mills in Biella. The relaxed yet gracefully fluid silhouette with wide notch lapels allows for versatile styling—worn open for an effortless look or cinched at the waist for a more tailored silhouette.',
                            'Features include welt side pockets, a single interior pocket, and a fully lined interior in silk-blend fabric for smooth layering over knitwear and suiting.',
                        ],
                    ],
                    [
                        'title' => 'Material & Care',
                        'bullets' => [
                            '100% Italian Cashmere (outer)',
                            '92% Silk, 8% Elastane (lining)',
                            'Dry clean only',
                            'Store on a padded hanger',
                            'Avoid direct sunlight exposure',
                            'Steam to remove wrinkles; do not iron directly',
                        ],
                    ],
                    [
                        'title' => 'Fit & Sizing',
                        'paragraphs' => [
                            'This coat runs true to size with a relaxed, oversized fit. The model is 5\'10" and wears a size S. For a more fitted look, we recommend sizing down.',
                            'Length: 110cm (size S) · Shoulder: Dropped, 44cm · Sleeve: 62cm',
                        ],
                    ],
                ],
                'recommendations' => [
                    ['slug' => 'ribbed-cashmere-turtleneck', 'name' => 'Ribbed Cashmere Turtleneck', 'price' => '$385.00', 'image' => 'https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=720&q=85'],
                    ['slug' => 'tailored-wool-trousers', 'name' => 'Tailored Wool Trousers', 'price' => '$445.00', 'image' => 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=720&q=85'],
                    ['slug' => 'structured-leather-tote', 'name' => 'Structured Leather Tote', 'price' => '$620.00', 'image' => 'https://images.unsplash.com/photo-1584917867710-9f5d3d6b7d4a?auto=format&fit=crop&w=720&q=85'],
                    ['slug' => 'suede-ankle-boots', 'name' => 'Suede Ankle Boots', 'price' => '$510.00', 'image' => 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=720&q=85'],
                ],
            ],
        ];

        foreach ($this->relatedProductDefinitions() as $product) {
            $products[$product['slug']] = $this->genericProduct($product);
        }

        return $products;
    }

    /**
     * @return list<array{slug: string, name: string, price: string, image: string}>
     */
    private function relatedProductDefinitions(): array
    {
        return [
            ['slug' => 'structured-wool-overcoat', 'name' => 'Structured Wool Overcoat', 'price' => '$1,290.00', 'image' => 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85'],
            ['slug' => 'pearl-button-silk-blouse', 'name' => 'Pearl Button Silk Blouse', 'price' => '$485.00', 'image' => 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1200&q=85'],
            ['slug' => 'cashmere-turtleneck', 'name' => 'Cashmere Turtleneck', 'price' => '$620.00', 'image' => 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=85'],
            ['slug' => 'pinstripe-tailored-blazer', 'name' => 'Pinstripe Tailored Blazer', 'price' => '$890.00', 'image' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'],
            ['slug' => 'pleated-midi-skirt', 'name' => 'Pleated Midi Skirt', 'price' => '$420.00', 'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'],
            ['slug' => 'belted-camel-trench', 'name' => 'Belted Camel Trench', 'price' => '$1,450.00', 'image' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85'],
        ];
    }

    /**
     * @param  array{slug: string, name: string, price: string, image: string}  $product
     * @return array<string, mixed>
     */
    private function genericProduct(array $product): array
    {
        return [
            'slug' => $product['slug'],
            'name' => $product['name'],
            'eyebrow' => 'Atelier Street Collection',
            'category' => 'Fall/Winter Collection',
            'collection' => 'Essentials',
            'price' => $product['price'],
            'description' => 'A considered Atelier Street layer designed with refined proportions, premium materials, and everyday versatility.',
            'images' => [['src' => $product['image'], 'alt' => $product['name']]],
            'colors' => [['value' => 'default', 'label' => 'Signature', 'hex' => '#c69768']],
            'sizes' => [
                ['value' => 'XS', 'available' => true],
                ['value' => 'S', 'available' => true],
                ['value' => 'M', 'available' => true],
                ['value' => 'L', 'available' => true],
                ['value' => 'XL', 'available' => true],
            ],
            'benefits' => [
                ['label' => 'Complimentary shipping on orders over $500', 'icon' => 'truck'],
                ['label' => 'Free returns within 30 days', 'icon' => 'rotate'],
                ['label' => 'Authenticity guaranteed', 'icon' => 'shield'],
            ],
            'details' => [
                ['title' => 'Product Details', 'paragraphs' => ['Designed to become a dependable part of your seasonal wardrobe, with a relaxed silhouette and refined finishing.']],
                ['title' => 'Material & Care', 'bullets' => ['Premium seasonal fabric', 'Dry clean only', 'Store on a padded hanger']],
                ['title' => 'Fit & Sizing', 'paragraphs' => ['This style runs true to size. Choose your usual size for the intended fit.']],
            ],
            'recommendations' => [],
        ];
    }
}
