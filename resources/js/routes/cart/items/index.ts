import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../wayfinder'
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
* @see \App\Http\Controllers\CartController::update
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
export const update = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/{lang?}/cart/items/{item}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CartController::update
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
update.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::update
* @see app/Http/Controllers/CartController.php:93
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
update.patch = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CartController::destroy
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
export const destroy = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{lang?}/cart/items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::destroy
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
destroy.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::destroy
* @see app/Http/Controllers/CartController.php:116
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}'
*/
destroy.delete = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CartController::save
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
export const save = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/{lang?}/cart/items/{item}/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CartController::save
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
save.url = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions) => {
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

    return save.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::save
* @see app/Http/Controllers/CartController.php:133
* @param lang - Default: '$lang'
* @route '/{lang?}/cart/items/{item}/save'
*/
save.post = (args: { lang?: string | number, item: number | { id: number } } | [lang: string | number, item: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

const items = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    save: Object.assign(save, save),
}

export default items