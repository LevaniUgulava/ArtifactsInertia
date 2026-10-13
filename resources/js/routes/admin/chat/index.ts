import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::index
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::index
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::index
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChatController::index
* @see app/Http/Controllers/ChatController.php:126
* @route '/admin/chat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
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
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
export const message = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(args, options),
    method: 'post',
})

message.definition = {
    methods: ["post"],
    url: '/admin/chat/{chat}/message',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
message.url = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return message.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::message
* @see app/Http/Controllers/ChatController.php:105
* @route '/admin/chat/{chat}/message'
*/
message.post = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: message.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
export const close = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

close.definition = {
    methods: ["post"],
    url: '/admin/chat/{chat}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
close.url = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return close.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::close
* @see app/Http/Controllers/ChatController.php:70
* @route '/admin/chat/{chat}/close'
*/
close.post = (args: { chat: string | number | { id: string | number } } | [chat: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

const chat = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    message: Object.assign(message, message),
    close: Object.assign(close, close),
}

export default chat