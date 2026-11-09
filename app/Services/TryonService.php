<?php

namespace App\Services;

use App\Models\TryonPrediction;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class TryonService
{
    public function __construct(private readonly FashnTryonService $fashnTryonService) {}

    /**
     * @return Collection<int, TryonPrediction>
     */
    public function predictions(): Collection
    {
        return TryonPrediction::query()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->get();
    }

    public function startPrediction(UploadedFile $modelImage, UploadedFile $productImage): TryonPrediction
    {
        $startedPrediction = $this->fashnTryonService->startPrediction($modelImage, $productImage);

        return TryonPrediction::query()->create([
            'prediction_id' => $startedPrediction['id'],
            'status' => 'starting',
        ]);
    }

    /**
     * @return array{prediction: TryonPrediction, error: array{name: string|null, message: string}|null}
     */
    public function refreshPrediction(TryonPrediction $prediction): array
    {
        $status = $this->fashnTryonService->predictionStatus($prediction->prediction_id);
        $prediction->update([
            'status' => $status['status'],
            'result_url' => $status['output'][0] ?? null,
        ]);

        return [
            'prediction' => $prediction,
            'error' => $status['error'],
        ];
    }
}
