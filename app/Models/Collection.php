<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable('name', 'slug')]
class Collection extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
