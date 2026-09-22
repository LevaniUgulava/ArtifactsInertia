<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0B0B0B">
        <link rel="icon" type="image/png" href="{{ asset('branding/artifacts-mark.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('branding/artifacts-mark.png') }}">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>
