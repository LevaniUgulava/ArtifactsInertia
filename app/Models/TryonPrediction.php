<?php

namespace App\Models;

use Database\Factories\TryonPredictionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['prediction_id', 'status', 'result_url'])]
class TryonPrediction extends Model
{
    /** @use HasFactory<TryonPredictionFactory> */
    use HasFactory;
}
