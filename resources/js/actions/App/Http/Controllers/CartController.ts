import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::show
* @see app/Http/Controllers/CartController.php:25
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
export const show = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{lang?}/cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::show
* @see app/Http/Controllers/CartController.php:25
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
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
        lang: args?.lang ?? '$lang',
    }

    return show.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::show
* @see app/Http/Controllers/CartController.php:25
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
show.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CartController::show
* @see app/Http/Controllers/CartController.php:25
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
show.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::store
* @see app/Http/Controllers/CartController.php:42
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items'
*/
export const store = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{lang?}/cart/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CartController::store
* @see app/Http/Controllers/CartController.php:42
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items'
*/
store.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::store
* @see app/Http/Controllers/CartController.php:42
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items'
*/
store.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::updateQuantity
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
export const updateQuantity = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateQuantity.url(args, options),
    method: 'patch',
})

updateQuantity.definition = {
    methods: ["patch"],
    url: '/{lang?}/cart/items/{item}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CartController::updateQuantity
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
updateQuantity.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            item: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        item: typeof args.item === 'object'
        ? args.item.id
        : args.item,
    }

    return updateQuantity.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::updateQuantity
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
updateQuantity.patch = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateQuantity.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CartController::remove
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
export const remove = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/{lang?}/cart/items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::remove
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
remove.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            item: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        item: typeof args.item === 'object'
        ? args.item.id
        : args.item,
    }

    return remove.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::remove
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
remove.delete = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CartController::saveForLater
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
export const saveForLater = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveForLater.url(args, options),
    method: 'post',
})

saveForLater.definition = {
    methods: ["post"],
    url: '/{lang?}/cart/items/{item}/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CartController::saveForLater
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
saveForLater.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            item: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        item: typeof args.item === 'object'
        ? args.item.id
        : args.item,
    }

    return saveForLater.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::saveForLater
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
saveForLater.post = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveForLater.url(args, options),
    method: 'post',
})

const CartController = { show, store, updateQuantity, remove, saveForLater }

export default CartController