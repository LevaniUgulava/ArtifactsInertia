<?php

namespace App\Http\Controllers;

use App\Services\AdminService;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(private readonly AdminService $adminService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Media/Index', ['media' => $this->adminService->mediaIndexData()]);
    }
}
