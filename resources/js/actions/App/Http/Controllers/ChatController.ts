import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::adminIndex
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/admin/chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::adminIndex
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::adminIndex
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChatController::adminIndex
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::show
* @see app/Http/Controllers/ChatController.php:82
* @route '/admin/chat/{chat}'
*/
export const show = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/chat/{chat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::show
* @see app/Http/Controllers/ChatController.php:82
* @route '/admin/chat/{chat}'
*/
show.url = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { chat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            chat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        chat: typeof args.chat === 'object'
        ? args.chat.id
        : args.chat,
    }

    return show.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::show
* @see app/Http/Controllers/ChatController.php:82
* @route '/admin/chat/{chat}'
*/
show.get = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChatController::show
* @see app/Http/Controllers/ChatController.php:82
* @route '/admin/chat/{chat}'
*/
show.head = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::adminMessage
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
export const adminMessage = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminMessage.url(args, options),
    method: 'post',
})

adminMessage.definition = {
    methods: ["post"],
    url: '/admin/chat/{chat}/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::adminMessage
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
adminMessage.url = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { chat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            chat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        chat: typeof args.chat === 'object'
        ? args.chat.id
        : args.chat,
    }

    return adminMessage.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::adminMessage
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
adminMessage.post = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
const close48ec77061c494ae88e3d585347adee0e = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close48ec77061c494ae88e3d585347adee0e.url(args, options),
    method: 'post',
})

close48ec77061c494ae88e3d585347adee0e.definition = {
    methods: ["post"],
    url: '/admin/chat/{chat}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
close48ec77061c494ae88e3d585347adee0e.url = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { chat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            chat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        chat: typeof args.chat === 'object'
        ? args.chat.id
        : args.chat,
    }

    return close48ec77061c494ae88e3d585347adee0e.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
close48ec77061c494ae88e3d585347adee0e.post = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close48ec77061c494ae88e3d585347adee0e.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/{chat}/close'
*/
const close069dc96345fbcca27acf5e39577cf4e8 = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close069dc96345fbcca27acf5e39577cf4e8.url(args, options),
    method: 'post',
})

close069dc96345fbcca27acf5e39577cf4e8.definition = {
    methods: ["post"],
    url: '/{lang?}/chat/{chat}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @param lang - Default: '$lang'
* @route '/{lang?}/chat/{chat}/close'
*/
close069dc96345fbcca27acf5e39577cf4e8.url = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return close069dc96345fbcca27acf5e39577cf4e8.definition.url
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
close069dc96345fbcca27acf5e39577cf4e8.post = (args: { lang?: string | number, chat: string | number | { id: string | number } } | [lang: string | number, chat: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close069dc96345fbcca27acf5e39577cf4e8.url(args, options),
    method: 'post',
})

/**
* Multiple routes resolve to \App\Http\Controllers\ChatController::close, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `close['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const close = {
    '/admin/chat/{chat}/close': close48ec77061c494ae88e3d585347adee0e,
    '/{lang?}/chat/{chat}/close': close069dc96345fbcca27acf5e39577cf4e8,
}

/**
* @see \App\Http\Controllers\ChatController::openChat
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
export const openChat = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: openChat.url(args, options),
    method: 'post',
})

openChat.definition = {
    methods: ["post"],
    url: '/{lang?}/chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::openChat
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
openChat.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return openChat.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::openChat
* @see app/Http/Controllers/ChatController.php:22
* @param lang - Default: '$lang'
* @route '/{lang?}/chat'
*/
openChat.post = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: openChat.url(args, options),
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

const ChatController = { adminIndex, show, adminMessage, close, openChat, message }

export default ChatController