<?php

namespace App\Http\Controllers;

use App\Http\Resources\Catalog\CatalogProductResource;
use App\Services\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(public HomeService $homeService) {}

    /**
     * Show the storefront home page.
     */
    public function index(Request $request): Response
    {
        $newArrivals = $this->homeService->getNewArrivals();
        $trendingProducts = $this->homeService->getTrendingProducts();
        $collections = $this->homeService->getCollections();

        return Inertia::render('Home/Home', [
            'newArrivals' => CatalogProductResource::collection($newArrivals)->resolve($request),
            'trendingProducts' => CatalogProductResource::collection($trendingProducts)->resolve($request),
            'collections' => $collections,
        ]);
    }
}
