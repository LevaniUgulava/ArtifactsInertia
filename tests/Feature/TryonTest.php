<?php

use App\Models\TryonPrediction;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;

it('renders the try-on page for an admin', function () {
    Http::fake(['api.fashn.ai/v1/credits' => Http::response([
        'credits' => ['total' => 234, 'subscription' => 100, 'on_demand' => 134],
    ])]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/tryon')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Tryon/Tryon')
            ->has('predictions', 0)
            ->where('credits.total', 234));
});

it('lists saved predictions newest first', function () {
    $this->freezeTime();
    $olderPrediction = TryonPrediction::factory()->create([
        'prediction_id' => 'older-prediction',
        'created_at' => now()->subDay(),
    ]);
    $newerPrediction = TryonPrediction::factory()->create([
        'prediction_id' => 'newer-prediction',
        'created_at' => now(),
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/tryon')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Tryon/Tryon')
            ->has('predictions', 2)
            ->where('predictions.0.id', (string) $newerPrediction->id)
            ->where('predictions.1.id', (string) $olderPrediction->id));
});

it('refreshes the FASHN credit balance through the admin endpoint', function () {
    Http::preventStrayRequests();
    Http::fake(['api.fashn.ai/v1/credits' => Http::response([
        'credits' => ['total' => 234, 'subscription' => 100, 'on_demand' => 134],
    ])]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->getJson('/admin/tryon/credits')
        ->assertOk()
        ->assertJsonPath('credits.total', 234)
        ->assertJsonPath('credits.subscription', 100)
        ->assertJsonPath('credits.on_demand', 134);

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.fashn.ai/v1/credits'
        && $request->method() === 'GET'
        && $request->header('Authorization') === ['Bearer test-fashn-key']);
});

it('redirects guests away from the try-on page', function () {
    $this->get('/admin/tryon')->assertRedirect('/admin/login');
});

it('forbids non-admin users from the try-on page', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/tryon')
        ->assertForbidden();
});

it('submits images to FASHN and saves the returned prediction id', function () {
    Http::preventStrayRequests();
    Http::fake([
        'api.fashn.ai/v1/run' => Http::response(['id' => 'prediction-123'], 200),
    ]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/tryon', [
            'model_image' => UploadedFile::fake()->image('model.png'),
            'product_image' => UploadedFile::fake()->image('product.png'),
        ], ['Accept' => 'application/json'])
        ->assertStatus(202)
        ->assertJsonPath('prediction.predictionId', 'prediction-123')
        ->assertJsonPath('prediction.status', 'starting');

    expect(TryonPrediction::query()->where('prediction_id', 'prediction-123')->exists())->toBeTrue();

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.fashn.ai/v1/run'
        && $request->header('Authorization') === ['Bearer test-fashn-key']
        && data_get($request->data(), 'model_name') === 'tryon-max'
        && str_starts_with(data_get($request->data(), 'inputs.model_image'), 'data:image/png;base64,')
        && str_starts_with(data_get($request->data(), 'inputs.product_image'), 'data:image/png;base64,')
        && ! array_key_exists('prompt', data_get($request->data(), 'inputs', [])));
});

it('passes a supplied prompt to FASHN try-on inputs', function () {
    Http::preventStrayRequests();
    Http::fake([
        'api.fashn.ai/v1/run' => Http::response(['id' => 'prediction-with-prompt'], 200),
    ]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/tryon', [
            'model_image' => UploadedFile::fake()->image('model.png'),
            'product_image' => UploadedFile::fake()->image('product.png'),
            'prompt' => 'Tuck in the shirt',
        ], ['Accept' => 'application/json'])
        ->assertStatus(202);

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.fashn.ai/v1/run'
        && data_get($request->data(), 'inputs.prompt') === 'Tuck in the shirt');
});

it('rejects invalid try-on image uploads', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/tryon', [
            'model_image' => UploadedFile::fake()->create('model.txt', 10, 'text/plain'),
            'product_image' => UploadedFile::fake()->image('product.png'),
        ], ['Accept' => 'application/json'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('model_image');
});

it('rejects try-on images larger than 10 MB', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/tryon', [
            'model_image' => UploadedFile::fake()->image('model.png')->size(10241),
            'product_image' => UploadedFile::fake()->image('product.png'),
        ], ['Accept' => 'application/json'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('model_image');
});

it('refreshes a saved prediction and persists its status and result url', function () {
    $prediction = TryonPrediction::factory()->create(['prediction_id' => 'prediction-123']);
    Http::preventStrayRequests();
    Http::fake([
        'api.fashn.ai/v1/status/prediction-123' => Http::response([
            'id' => 'prediction-123',
            'status' => 'completed',
            'output' => ['https://cdn.fashn.ai/result.png'],
            'error' => null,
        ]),
    ]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->postJson("/admin/tryon/predictions/{$prediction->id}/refresh")
        ->assertOk()
        ->assertJsonPath('prediction.predictionId', 'prediction-123')
        ->assertJsonPath('prediction.status', 'completed')
        ->assertJsonPath('prediction.resultUrl', 'https://cdn.fashn.ai/result.png');

    expect($prediction->fresh()->status)->toBe('completed');
    expect($prediction->fresh()->result_url)->toBe('https://cdn.fashn.ai/result.png');
});

it('persists a failed FASHN status and returns its runtime error', function () {
    $prediction = TryonPrediction::factory()->create(['prediction_id' => 'prediction-123']);
    Http::preventStrayRequests();
    Http::fake([
        'api.fashn.ai/v1/status/prediction-123' => Http::response([
            'id' => 'prediction-123',
            'status' => 'failed',
            'output' => null,
            'error' => ['name' => 'ImageLoadError', 'message' => 'The model image could not be loaded.'],
        ]),
    ]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->postJson("/admin/tryon/predictions/{$prediction->id}/refresh")
        ->assertOk()
        ->assertJsonPath('prediction.status', 'failed')
        ->assertJsonPath('error.message', 'The model image could not be loaded.');

    expect($prediction->fresh()->status)->toBe('failed');
});

it('returns a gateway error when FASHN rejects the prediction request', function () {
    Http::preventStrayRequests();
    Http::fake([
        'api.fashn.ai/v1/run' => Http::response([
            'error' => ['message' => 'No credits are available.'],
        ], 402),
    ]);
    config(['services.fashn.key' => 'test-fashn-key']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/tryon', [
            'model_image' => UploadedFile::fake()->image('model.png'),
            'product_image' => UploadedFile::fake()->image('product.png'),
        ], ['Accept' => 'application/json'])
        ->assertStatus(502)
        ->assertJson(['message' => 'No credits are available.']);
});

it('returns a safe error when the FASHN API key is missing', function () {
    $prediction = TryonPrediction::factory()->create(['prediction_id' => 'prediction-123']);
    config(['services.fashn.key' => null]);

    $this->actingAs(User::factory()->admin()->create())
        ->postJson("/admin/tryon/predictions/{$prediction->id}/refresh")
        ->assertStatus(503)
        ->assertJson(['message' => 'The FASHN API key is not configured.']);
});
