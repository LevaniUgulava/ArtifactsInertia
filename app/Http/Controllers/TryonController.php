<?php

namespace App\Http\Controllers;

use App\Exceptions\FashnApiException;
use App\Http\Requests\Tryon\StartTryonRequest;
use App\Http\Resources\Tryon\TryonPredictionResource;
use App\Models\TryonPrediction;
use App\Services\TryonService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class TryonController extends Controller
{
    public function __construct(private readonly TryonService $tryonService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Tryon/Tryon', [
            'predictions' => TryonPredictionResource::collection($this->tryonService->predictions())->resolve(),
        ]);
    }

    public function store(StartTryonRequest $request): JsonResponse
    {
        try {
            $prediction = $this->tryonService->startPrediction(
                $request->file('model_image'),
                $request->file('product_image'),
            );

            return response()->json([
                'prediction' => TryonPredictionResource::make($prediction)->resolve(),
            ], 202);
        } catch (FashnApiException $exception) {
            return response()->json(['message' => $exception->getMessage()], $exception->statusCode);
        }
    }

    public function refresh(TryonPrediction $tryonPrediction): JsonResponse
    {
        try {
            $result = $this->tryonService->refreshPrediction($tryonPrediction);

            return response()->json([
                'prediction' => TryonPredictionResource::make($result['prediction'])->resolve(),
                'error' => $result['error'],
            ]);
        } catch (FashnApiException $exception) {
            return response()->json(['message' => $exception->getMessage()], $exception->statusCode);
        }
    }
}
