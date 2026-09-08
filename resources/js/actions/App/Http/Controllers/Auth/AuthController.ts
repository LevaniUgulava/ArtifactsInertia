import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
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
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return showLogin.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
showLogin.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
showLogin.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
const showLoginForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
showLoginForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showLogin
* @see app/Http/Controllers/Auth/AuthController.php:21
* @param lang - Default: 'en'
* @route '/{lang?}/login'
*/
showLoginForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLogin.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showLogin.form = showLoginForm

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
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
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return showRegister.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
showRegister.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
showRegister.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRegister.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
const showRegisterForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRegister.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
showRegisterForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRegister.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showRegister
* @see app/Http/Controllers/Auth/AuthController.php:29
* @param lang - Default: 'en'
* @route '/{lang?}/register'
*/
showRegisterForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRegister.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showRegister.form = showRegisterForm

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
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
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return showVerification.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
showVerification.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
showVerification.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showVerification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
const showVerificationForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
showVerificationForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showVerification
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
showVerificationForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showVerification.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showVerification.form = showVerificationForm

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
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
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
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
        lang: args?.lang ?? 'en',
    }

    return showUpdatePassword.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
showUpdatePassword.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUpdatePassword.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
showUpdatePassword.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showUpdatePassword.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
const showUpdatePasswordForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUpdatePassword.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
showUpdatePasswordForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUpdatePassword.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::showUpdatePassword
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
showUpdatePasswordForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showUpdatePassword.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showUpdatePassword.form = showUpdatePasswordForm

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
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
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
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
        lang: args.lang ?? 'en',
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
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmail.get = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyEmail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmail.head = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifyEmail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
const verifyEmailForm = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyEmail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmailForm.get = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyEmail.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verifyEmail
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyEmailForm.head = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verifyEmail.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verifyEmail.form = verifyEmailForm

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:116
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
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
sendVerificationNotification.url = (options?: RouteQueryOptions) => {
    return sendVerificationNotification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
sendVerificationNotification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendVerificationNotification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
const sendVerificationNotificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendVerificationNotification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::sendVerificationNotification
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
sendVerificationNotificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendVerificationNotification.url(options),
    method: 'post',
})

sendVerificationNotification.form = sendVerificationNotificationForm

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:81
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
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::login
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: login.url(options),
    method: 'post',
})

login.form = loginForm

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:63
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
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::register
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

register.form = registerForm

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

const AuthController = { showLogin, showRegister, showVerification, showUpdatePassword, verifyEmail, sendVerificationNotification, login, register, logout }

export default AuthController