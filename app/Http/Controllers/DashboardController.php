<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\RecentProductResource;
use App\Services\AdminService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly AdminService $adminService) {}

    public function __invoke(): Response
    {
        $data = $this->adminService->dashboardData();

        return Inertia::render('Admin/Main/Dashboard', [
            'stats' => $data['stats'],
            'inventory' => $data['inventory'],
            'recentProducts' => RecentProductResource::collection($data['recentProducts'])->resolve(),
        ]);
    }
}
