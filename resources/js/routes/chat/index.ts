import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::open
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
export const open = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

open.definition = {
    methods: ["post"],
    url: '/{lang?}/chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::open
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
open.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return open.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::open
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
open.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:48
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/message'
*/
export const message = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(args, options),
    method: 'post',
})

message.definition = {
    methods: ["post"],
    url: '/{lang?}/chat/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:48
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/message'
*/
message.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return message.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:48
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/message'
*/
message.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/{chat}/close'
*/
export const close = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

close.definition = {
    methods: ["post"],
    url: '/{lang?}/chat/{chat}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/{chat}/close'
*/
close.url = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            lang: args[0],
            chat: args[1],
        }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
        "lang",
    ])

    const parsedArgs = {
        lang: args.lang ?? '$lang',
        chat: typeof args.chat === 'object'
        ? args.chat.id
        : args.chat,
    }

    return close.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/{chat}/close'
*/
close.post = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

const chat = {
    open: Object.assign(open, open),
    message: Object.assign(message, message),
    close: Object.assign(close, close),
}

export default chat