import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TryonController::index
* @see app/Http/Controllers/TryonController.php:18
* @route '/admin/tryon'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tryon',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TryonController::index
* @see app/Http/Controllers/TryonController.php:18
* @route '/admin/tryon'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TryonController::index
* @see app/Http/Controllers/TryonController.php:18
* @route '/admin/tryon'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TryonController::index
* @see app/Http/Controllers/TryonController.php:18
* @route '/admin/tryon'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TryonController::store
* @see app/Http/Controllers/TryonController.php:25
* @route '/admin/tryon'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tryon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TryonController::store
* @see app/Http/Controllers/TryonController.php:25
* @route '/admin/tryon'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TryonController::store
* @see app/Http/Controllers/TryonController.php:25
* @route '/admin/tryon'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TryonController::refresh
* @see app/Http/Controllers/TryonController.php:41
* @route '/admin/tryon/predictions/{tryonPrediction}/refresh'
*/
export const refresh = (args: { tryonPrediction: string | number | { id: string | number } } | [tryonPrediction: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(args, options),
    method: 'post',
})

refresh.definition = {
    methods: ["post"],
    url: '/admin/tryon/predictions/{tryonPrediction}/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TryonController::refresh
* @see app/Http/Controllers/TryonController.php:41
* @route '/admin/tryon/predictions/{tryonPrediction}/refresh'
*/
refresh.url = (args: { tryonPrediction: string | number | { id: string | number } } | [tryonPrediction: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tryonPrediction: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tryonPrediction: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tryonPrediction: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tryonPrediction: typeof args.tryonPrediction === 'object'
        ? args.tryonPrediction.id
        : args.tryonPrediction,
    }

    return refresh.definition.url
            .replace('{tryonPrediction}', parsedArgs.tryonPrediction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TryonController::refresh
* @see app/Http/Controllers/TryonController.php:41
* @route '/admin/tryon/predictions/{tryonPrediction}/refresh'
*/
refresh.post = (args: { tryonPrediction: string | number | { id: string | number } } | [tryonPrediction: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(args, options),
    method: 'post',
})

const TryonController = { index, store, refresh }

export default TryonController