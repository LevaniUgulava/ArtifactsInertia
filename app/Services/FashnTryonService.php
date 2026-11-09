<?php

namespace App\Services;

use App\Exceptions\FashnApiException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;

class FashnTryonService
{
    /**
     * @return array{total: int, subscription: int, on_demand: int}
     */
    public function credits(): array
    {
        try {
            $response = $this->request()
                ->timeout(15)
                ->get('/credits');
        } catch (ConnectionException) {
            throw new FashnApiException('Could not retrieve FASHN credits.', 502);
        }

        if (! $response->successful()) {
            throw new FashnApiException($this->errorMessage($response->json()), 502);
        }

        $credits = $response->json('credits');

        if (! is_array($credits)
            || ! is_int($credits['total'] ?? null)
            || ! is_int($credits['subscription'] ?? null)
            || ! is_int($credits['on_demand'] ?? null)) {
            throw new FashnApiException('FASHN returned an invalid credits response.', 502);
        }

        return [
            'total' => $credits['total'],
            'subscription' => $credits['subscription'],
            'on_demand' => $credits['on_demand'],
        ];
    }

    /**
     * @return array{id: string}
     */
    public function startPrediction(UploadedFile $modelImage, UploadedFile $productImage): array
    {
        try {
            $response = $this->request()
                ->timeout(30)
                ->post('/run', [
                    'model_name' => 'tryon-max',
                    'inputs' => [
                        'model_image' => $this->imageDataUrl($modelImage),
                        'product_image' => $this->imageDataUrl($productImage),
                    ],
                ]);
        } catch (ConnectionException) {
            throw new FashnApiException('Could not connect to the FASHN API.', 502);
        }

        if (! $response->successful()) {
            throw new FashnApiException($this->errorMessage($response->json()), 502);
        }

        $predictionId = $response->json('id');

        if (! is_string($predictionId) || $predictionId === '') {
            throw new FashnApiException('FASHN returned an invalid prediction response.', 502);
        }

        return ['id' => $predictionId];
    }

    /**
     * @return array{id: string, status: string, output: list<string>, error: array{name: string|null, message: string}|null}
     */
    public function predictionStatus(string $predictionId): array
    {
        try {
            $response = $this->request()
                ->timeout(15)
                ->get('/status/'.rawurlencode($predictionId));
        } catch (ConnectionException) {
            throw new FashnApiException('Could not retrieve the FASHN prediction status.', 502);
        }

        if (! $response->successful()) {
            throw new FashnApiException($this->errorMessage($response->json()), 502);
        }

        $data = $response->json();
        $id = data_get($data, 'id');
        $status = data_get($data, 'status');

        if (! is_string($id) || ! is_string($status)) {
            throw new FashnApiException('FASHN returned an invalid prediction status.', 502);
        }

        $output = data_get($data, 'output', []);
        $providerError = data_get($data, 'error');

        return [
            'id' => $id,
            'status' => $status,
            'output' => is_array($output) ? array_values(array_filter($output, 'is_string')) : [],
            'error' => is_array($providerError)
                ? [
                    'name' => is_string($providerError['name'] ?? null) ? $providerError['name'] : null,
                    'message' => is_string($providerError['message'] ?? null) ? $providerError['message'] : 'The try-on prediction failed.',
                ]
                : null,
        ];
    }

    private function request(): PendingRequest
    {
        $apiKey = config('services.fashn.key');

        if (! is_string($apiKey) || $apiKey === '') {
            throw new FashnApiException('The FASHN API key is not configured.', 503);
        }

        return Http::baseUrl(rtrim((string) config('services.fashn.base_url'), '/'))
            ->acceptJson()
            ->withToken($apiKey)
            ->connectTimeout(5);
    }

    private function imageDataUrl(UploadedFile $image): string
    {
        $path = $image->getRealPath();

        if (! is_string($path)) {
            throw new FashnApiException('The uploaded image could not be read.', 422);
        }

        $contents = file_get_contents($path);

        if ($contents === false) {
            throw new FashnApiException('The uploaded image could not be read.', 422);
        }

        return 'data:'.$image->getMimeType().';base64,'.base64_encode($contents);
    }

    private function errorMessage(mixed $response): string
    {
        $message = data_get($response, 'error.message')
            ?? data_get($response, 'message')
            ?? 'FASHN could not process the try-on request.';

        return is_string($message) ? $message : 'FASHN could not process the try-on request.';
    }
}
