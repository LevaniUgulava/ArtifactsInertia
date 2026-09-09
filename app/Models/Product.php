<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'spu',
        'slug',
        'name',
        'eyebrow',
        'description',
        'badge',
        'sex',
        'benefits',
        'details',
    ];

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'details' => 'array',
            'sex' => 'string',
        ];
    }

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class);
    }

    /**
     * @return list<array{src: string, alt: string}>
     */
    public function imageUrls(): array
    {
        return $this->variants
            ->flatMap(fn (Variant $variant): array => $variant->imageUrls())
            ->unique(fn (array $image): string => basename((string) parse_url($image['src'], PHP_URL_PATH)))
            ->values()
            ->all();
    }

    public function startingPrice(): ?string
    {
        $price = $this->variants->min('price');

        return $price === null ? null : number_format((float) $price, 2, '.', ',');
    }

    public function primaryImageUrl(): ?string
    {
        $variant = $this->variants->first();

        if ($variant === null) {
            return null;
        }

        return $variant->getFirstMediaUrl('images', 'preview') ?: null;
    }
}
