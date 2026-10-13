import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::showAdminLogin
* @see app/Http/Controllers/Auth/AuthController.php:29
* @route '/admin/login'
*/
export const showAdminLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAdminLogin.url(options),
    method: 'get',
})

showAdminLogin.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showAdminLogin
* @see app/Http/Controllers/Auth/AuthController.php:29
* @route '/admin/login'
*/
showAdminLogin.url = (options?: RouteQueryOptions) => {
    return showAdminLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showAdminLogin
* @see app/Http/Controllers/Auth/AuthController.php:29
* @route '/admin/login'
*/
showAdminLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAdminLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showAdminLogin
* @see app/Http/Controllers/Auth/AuthController.php:29
* @route '/admin/login'
*/
showAdminLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showAdminLogin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::adminLogin
* @see app/Http/Controllers/Auth/AuthController.php:105
* @route '/admin/login'
*/
export const adminLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminLogin.url(options),
    method: 'post',
})

adminLogin.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::adminLogin
* @see app/Http/Controllers/Auth/AuthController.php:105
* @route '/admin/login'
*/
adminLogin.url = (options?: RouteQueryOptions) => {
    return adminLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::adminLogin
* @see app/Http/Controllers/Auth/AuthController.php:105
* @route '/admin/login'
*/
adminLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminLogin.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
export const showLogin = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(args, options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/{lang?}/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
showLogin.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showLogin.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
showLogin.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: '$lang'
* @route '/{lang?}/login'
*/
showLogin.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
export const showRegister = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(args, options),
    method: 'get',
})

showRegister.definition = {
    methods: ["get","head"],
    url: '/{lang?}/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
showRegister.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showRegister.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
showRegister.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: '$lang'
* @route '/{lang?}/register'
*/
showRegister.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRegister.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:45
* @param lang - Default: '$lang'
* @route '/{lang?}/verification'
*/
export const showVerification = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerification.url(args, options),
    method: 'get',
})

showVerification.definition = {
    methods: ["get","head"],
    url: '/{lang?}/verification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:45
* @param lang - Default: '$lang'
* @route '/{lang?}/verification'
*/
showVerification.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showVerification.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:45
* @param lang - Default: '$lang'
* @route '/{lang?}/verification'
*/
showVerification.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:45
* @param lang - Default: '$lang'
* @route '/{lang?}/verification'
*/
showVerification.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showVerification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:55
* @param lang - Default: '$lang'
* @route '/{lang?}/password/update'
*/
export const showUpdatePassword = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUpdatePassword.url(args, options),
    method: 'get',
})

showUpdatePassword.definition = {
    methods: ["get","head"],
    url: '/{lang?}/password/update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:55
* @param lang - Default: '$lang'
* @route '/{lang?}/password/update'
*/
showUpdatePassword.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showUpdatePassword.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:55
* @param lang - Default: '$lang'
* @route '/{lang?}/password/update'
*/
showUpdatePassword.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUpdatePassword.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:55
* @param lang - Default: '$lang'
* @route '/{lang?}/password/update'
*/
showUpdatePassword.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showUpdatePassword.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:129
* @param lang - Default: '$lang'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
export const verifyEmail = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyEmail.url(args, options),
    method: 'get',
})

verifyEmail.definition = {
    methods: ["get","head"],
    url: '/{lang?}/verification/verify/{user}/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:129
* @param lang - Default: '$lang'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmail.url = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            user: args[1],
            hash: args[2],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
        hash: args.hash,
    }

    return verifyEmail.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{user}', parsedArgs.user.toString())
            .replace('{hash}', parsedArgs.hash.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:129
* @param lang - Default: '$lang'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmail.get = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyEmail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:129
* @param lang - Default: '$lang'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmail.head = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifyEmail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:148
* @route '/verification-notification'
*/
export const sendVerificationNotification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendVerificationNotification.url(options),
    method: 'post',
})

sendVerificationNotification.definition = {
    methods: ["post"],
    url: '/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:148
* @route '/verification-notification'
*/
sendVerificationNotification.url = (options?: RouteQueryOptions) => {
    return sendVerificationNotification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:148
* @route '/verification-notification'
*/
sendVerificationNotification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendVerificationNotification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:89
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:89
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:89
* @route '/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:71
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:71
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:71
* @route '/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:158
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
* @see app/Http/Controllers/Auth/AuthController.php:158
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::logout
* @see app/Http/Controllers/Auth/AuthController.php:158
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

const AuthController = { showAdminLogin, adminLogin, showLogin, showRegister, showVerification, showUpdatePassword, verifyEmail, sendVerificationNotification, login, register, logout }

export default AuthController