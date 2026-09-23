import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:75
* @param lang - Default: '$lang'
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
* @see app/Http/Controllers/CheckoutController.php:75
* @param lang - Default: '$lang'
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
        lang: args?.lang ?? '$lang',
    }

    return placeOrder.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::placeOrder
* @see app/Http/Controllers/CheckoutController.php:75
* @param lang - Default: '$lang'
* @route '/{lang?}/checkout/place-order'
*/
placeOrder.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: placeOrder.url(args, options),
    method: 'post',
})

const checkout = {
    placeOrder: Object.assign(placeOrder, placeOrder),
}

export default checkout