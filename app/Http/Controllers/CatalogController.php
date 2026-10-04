<?php

namespace App\Http\Controllers;

use App\Http\Resources\Catalog\CatalogResource;
use App\Services\CatalogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function __construct(private readonly CatalogService $catalogService) {}

    /**
     * Show the public product catalog.
     */
    public function index(Request $request): Response
    {
        $catalog = $this->catalogService->browse($request);

        return Inertia::render('Catalog/Catalog', [
            'catalog' => (new CatalogResource($catalog['products'], $catalog['collection'], $catalog['filters']))->resolve($request),
        ]);
    }
}
