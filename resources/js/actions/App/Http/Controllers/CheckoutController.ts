import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
export const show = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{lang?}/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
show.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
show.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
show.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
const showForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
showForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CheckoutController::show
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: 'en'
* @route '/{lang?}/checkout'
*/
showForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:80
* @param lang - Default: 'en'
* @route '/{lang?}/checkout/place-order'
*/
export const placeOrder = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: placeOrder.url(args, options),
    method: 'post',
})

placeOrder.definition = {
    methods: ["post"],
    url: '/{lang?}/checkout/place-order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:80
* @param lang - Default: 'en'
* @route '/{lang?}/checkout/place-order'
*/
placeOrder.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return placeOrder.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:80
* @param lang - Default: 'en'
* @route '/{lang?}/checkout/place-order'
*/
placeOrder.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: placeOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:80
* @param lang - Default: 'en'
* @route '/{lang?}/checkout/place-order'
*/
const placeOrderForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: placeOrder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:80
* @param lang - Default: 'en'
* @route '/{lang?}/checkout/place-order'
*/
placeOrderForm.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: placeOrder.url(args, options),
    method: 'post',
})

placeOrder.form = placeOrderForm

const CheckoutController = { show, placeOrder }

export default CheckoutController