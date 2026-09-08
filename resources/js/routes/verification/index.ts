import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
export const notice = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(args, options),
    method: 'get',
})

notice.definition = {
    methods: ["get","head"],
    url: '/{lang?}/verification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
notice.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return notice.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
notice.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notice.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
notice.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notice.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
const noticeForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
noticeForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::notice
* @see app/Http/Controllers/Auth/AuthController.php:37
* @param lang - Default: 'en'
* @route '/{lang?}/verification'
*/
noticeForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notice.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

notice.form = noticeForm

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
export const verify = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/{lang?}/verification/verify/{user}/{hash}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verify.url = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{user}', parsedArgs.user.toString())
            .replace('{hash}', parsedArgs.hash.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verify.get = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verify.head = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
const verifyForm = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verify.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyForm.get = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verify.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::verify
* @see app/Http/Controllers/Auth/AuthController.php:97
* @param lang - Default: 'en'
* @route '/{lang?}/verification/verify/{user}/{hash}'
*/
verifyForm.head = (args: { lang?: string | number, user: string | number | { id: string | number }, hash: string | number } | [lang: string | number, user: string | number | { id: string | number }, hash: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: verify.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

verify.form = verifyForm

/**
* @see \App\Http\Controllers\Auth\AuthController::send
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::send
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::send
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::send
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::send
* @see app/Http/Controllers/Auth/AuthController.php:116
* @route '/verification-notification'
*/
sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

send.form = sendForm

const verification = {
    notice: Object.assign(notice, notice),
    verify: Object.assign(verify, verify),
    send: Object.assign(send, send),
}

export default verification