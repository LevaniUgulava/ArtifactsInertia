<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryType extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'value',
        'name',
        'description',
        'icon',
        'price',
    ];

    /**
     * @return HasMany<Order, $this>
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
