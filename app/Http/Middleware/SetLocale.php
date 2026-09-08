<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $lang = $request->query('lang');
        $available_locales = config('app.available_locales');
        if($lang && in_array($lang, $available_locales)) {
            app()->setLocale($lang);
            URL::defaults(['lang' => $lang]);

        }
        $request->route()->forgetParameter('lang');

        return $next($request);
    }
}
