import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:16
* @param lang - Default: '$lang'
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
* @see app/Http/Controllers/ProductController.php:16
* @param lang - Default: '$lang'
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
        lang: args.lang ?? '$lang',
        product: args.product,
    }

    return show.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:16
* @param lang - Default: '$lang'
* @route '/{lang?}/products/{product}'
*/
show.get = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductController::show
* @see app/Http/Controllers/ProductController.php:16
* @param lang - Default: '$lang'
* @route '/{lang?}/products/{product}'
*/
show.head = (args: { lang?: string | number, product: string | number } | [lang: string | number, product: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const ProductController = { show }

export default ProductController