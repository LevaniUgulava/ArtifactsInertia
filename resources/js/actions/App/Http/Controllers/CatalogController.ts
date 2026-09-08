import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
export const index = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{lang?}/catalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
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
        lang: args?.lang ?? 'en',
    }

    return index.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
index.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
index.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
const indexForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
indexForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatalogController::index
* @see app/Http/Controllers/CatalogController.php:14
* @param lang - Default: 'en'
* @route '/{lang?}/catalog'
*/
indexForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const CatalogController = { index }

export default CatalogController