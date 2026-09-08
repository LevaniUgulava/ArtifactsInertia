import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
export const show = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{lang?}/products/{product}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
show.url = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions) => {
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
        lang: args.lang ?? 'en',
        product: args.product,
    }

    return show.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
show.get = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
show.head = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
const showForm = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
showForm.get = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/products/{product}'
*/
showForm.head = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const ProductController = { show }

export default ProductController