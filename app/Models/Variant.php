<?php

namespace App\Models;

use Database\Factories\VariantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable(['sku', 'color', 'color_label', 'color_hex', 'size', 'price', 'stock'])]
class Variant extends Model implements HasMedia
{
    /** @use HasFactory<VariantFactory> */
    use HasFactory, InteractsWithMedia;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 1200, 1600)
            ->nonQueued();
    }

    /**
     * @return list<array{src: string, alt: string}>
     */
    public function imageUrls(): array
    {
        return $this->getMedia('images')->map(fn (Media $media): array => [
            'src' => $media->getUrl('preview'),
            'alt' => (string) $media->getCustomProperty(
                'alt',
                $this->relationLoaded('product') ? ($this->product?->name ?? $this->sku) : $this->sku,
            ),
        ])->values()->all();
    }
}
