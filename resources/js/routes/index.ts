import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
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
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return login.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
login.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
login.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
const loginForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
loginForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
loginForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
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
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return register.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
register.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
register.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
const registerForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
registerForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
registerForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: register.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
export const verification = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verification.url(args, options),
    method: 'get',
})

verification.definition = {
    methods: ["get","head"],
    url: '/{lang?}/verification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
verification.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verification.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
verification.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
verification.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
const verificationForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
verificationForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
verificationForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verification.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verification.form = verificationForm

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
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
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return cart.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/cart'
*/
cart.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/cart'
*/
cart.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/cart'
*/
const cartForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/cart'
*/
cartForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CartController::cart
* @see app/Http/Controllers/CartController.php:13
* @param lang - Default: 'en'
* @route '/{lang?}/cart'
*/
cartForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cart.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cart.form = cartForm

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
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
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return profile.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/profile'
*/
profile.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/profile'
*/
profile.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/profile'
*/
const profileForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/profile'
*/
profileForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::profile
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/profile'
*/
profileForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profile.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

profile.form = profileForm

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
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
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return account.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/account'
*/
account.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: account.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/account'
*/
account.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: account.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/account'
*/
const accountForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: account.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/account'
*/
accountForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: account.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::account
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: 'en'
* @route '/{lang?}/account'
*/
accountForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: account.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

account.form = accountForm

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
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:126
* @route '/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:126
* @route '/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
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
* @see routes/web.php:10
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return home.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
* @route '/{lang?}'
*/
home.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
* @route '/{lang?}'
*/
home.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
* @route '/{lang?}'
*/
const homeForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
* @route '/{lang?}'
*/
homeForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:10
* @param lang - Default: 'en'
* @route '/{lang?}'
*/
homeForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm
