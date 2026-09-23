import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FavoritesController::index
* @see app/Http/Controllers/FavoritesController.php:18
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites'
*/
export const index = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{lang?}/favorites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FavoritesController::index
* @see app/Http/Controllers/FavoritesController.php:18
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites'
*/
index.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lang: args }
    }

    if (Array.isArray(args)) {
        args = {
            lang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args?.lang ?? '$lang',
    }

    return index.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoritesController::index
* @see app/Http/Controllers/FavoritesController.php:18
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites'
*/
index.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FavoritesController::index
* @see app/Http/Controllers/FavoritesController.php:18
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites'
*/
index.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FavoritesController::store
* @see app/Http/Controllers/FavoritesController.php:36
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
export const store = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{lang?}/favorites/{product}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FavoritesController::store
* @see app/Http/Controllers/FavoritesController.php:36
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
store.url = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        product: args.product,
    }

    return store.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoritesController::store
* @see app/Http/Controllers/FavoritesController.php:36
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
store.post = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\FavoritesController::destroy
* @see app/Http/Controllers/FavoritesController.php:51
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
export const destroy = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{lang?}/favorites/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FavoritesController::destroy
* @see app/Http/Controllers/FavoritesController.php:51
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
destroy.url = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            product: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        product: args.product,
    }

    return destroy.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FavoritesController::destroy
* @see app/Http/Controllers/FavoritesController.php:51
* @param lang - Default: '$lang'
* @route '/{lang?}/favorites/{product}'
*/
destroy.delete = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const FavoritesController = { index, store, destroy }

export default FavoritesController