import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
export const login = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(args, options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/{lang?}/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
login.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return login.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
login.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
login.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
export const register = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(args, options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/{lang?}/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
register.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return register.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
register.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
register.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:23
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
export const cart = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(args, options),
    method: 'get',
})

cart.definition = {
    methods: ["get","head"],
    url: '/{lang?}/cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:23
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
cart.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return cart.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:23
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
cart.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:23
* @param lang - Default: '$lang'
* @route '/{lang?}/cart'
*/
cart.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
export const profile = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(args, options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/{lang?}/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
profile.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return profile.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
profile.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
profile.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
export const account = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: account.url(args, options),
    method: 'get',
})

account.definition = {
    methods: ["get","head"],
    url: '/{lang?}/account',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
account.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return account.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
account.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: account.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
account.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: account.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CheckoutController::checkout
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}/checkout'
*/
export const checkout = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/{lang?}/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CheckoutController::checkout
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}/checkout'
*/
checkout.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return checkout.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CheckoutController::checkout
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}/checkout'
*/
checkout.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CheckoutController::checkout
* @see app/Http/Controllers/CheckoutController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}/checkout'
*/
checkout.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:126
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:126
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:126
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CatalogController::catalog
* @see app/Http/Controllers/CatalogController.php:20
* @param lang - Default: '$lang'
* @route '/{lang?}/catalog'
*/
export const catalog = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: catalog.url(args, options),
    method: 'get',
})

catalog.definition = {
    methods: ["get","head"],
    url: '/{lang?}/catalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatalogController::catalog
* @see app/Http/Controllers/CatalogController.php:20
* @param lang - Default: '$lang'
* @route '/{lang?}/catalog'
*/
catalog.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return catalog.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::catalog
* @see app/Http/Controllers/CatalogController.php:20
* @param lang - Default: '$lang'
* @route '/{lang?}/catalog'
*/
catalog.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: catalog.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CatalogController::catalog
* @see app/Http/Controllers/CatalogController.php:20
* @param lang - Default: '$lang'
* @route '/{lang?}/catalog'
*/
catalog.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: catalog.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HomeController::home
* @see app/Http/Controllers/HomeController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}'
*/
export const home = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(args, options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/{lang?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::home
* @see app/Http/Controllers/HomeController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}'
*/
home.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return home.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::home
* @see app/Http/Controllers/HomeController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}'
*/
home.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HomeController::home
* @see app/Http/Controllers/HomeController.php:17
* @param lang - Default: '$lang'
* @route '/{lang?}'
*/
home.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(args, options),
    method: 'head',
})

