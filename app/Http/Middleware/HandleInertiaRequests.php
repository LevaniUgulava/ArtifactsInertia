<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'locale' => app()->getLocale(),
            'availableLocales' => config('app.available_locales', ['en']),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => $this->cartItemCount($request),
        ];
    }

    /**
     * Total quantity of items in the authenticated user's cart.
     */
    private function cartItemCount(Request $request): int
    {
        /** @var User|null $user */
        $user = $request->user();

        if ($user === null) {
            return 0;
        }

        return (int) ($user->cart()
            ->withSum('items as total_quantity', 'quantity')
            ->first()?->total_quantity ?? 0);
    }
}
