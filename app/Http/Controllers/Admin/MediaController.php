<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    public function index(): Response
    {
        $media = Media::query()->latest()->paginate(24)->through(fn (Media $item): array => [
            'id' => $item->id,
            'name' => $item->name,
            'fileName' => $item->file_name,
            'mimeType' => $item->mime_type,
            'url' => $item->getUrl(),
            'modelType' => class_basename($item->model_type),
        ]);

        return Inertia::render('Admin/Media', ['media' => $media]);
    }
}
