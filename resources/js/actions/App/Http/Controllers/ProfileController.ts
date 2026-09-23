import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
const show0ff0d9b21497290db5b31098cf4c0c79 = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0ff0d9b21497290db5b31098cf4c0c79.url(args, options),
    method: 'get',
})

show0ff0d9b21497290db5b31098cf4c0c79.definition = {
    methods: ["get","head"],
    url: '/{lang?}/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
show0ff0d9b21497290db5b31098cf4c0c79.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show0ff0d9b21497290db5b31098cf4c0c79.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
show0ff0d9b21497290db5b31098cf4c0c79.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0ff0d9b21497290db5b31098cf4c0c79.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/profile'
*/
show0ff0d9b21497290db5b31098cf4c0c79.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show0ff0d9b21497290db5b31098cf4c0c79.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
const show0522a72d3a9cbcbb706325c59f4e84dd = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0522a72d3a9cbcbb706325c59f4e84dd.url(args, options),
    method: 'get',
})

show0522a72d3a9cbcbb706325c59f4e84dd.definition = {
    methods: ["get","head"],
    url: '/{lang?}/account',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
show0522a72d3a9cbcbb706325c59f4e84dd.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show0522a72d3a9cbcbb706325c59f4e84dd.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
show0522a72d3a9cbcbb706325c59f4e84dd.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0522a72d3a9cbcbb706325c59f4e84dd.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProfileController::show
* @see app/Http/Controllers/ProfileController.php:15
* @param lang - Default: '$lang'
* @route '/{lang?}/account'
*/
show0522a72d3a9cbcbb706325c59f4e84dd.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show0522a72d3a9cbcbb706325c59f4e84dd.url(args, options),
    method: 'head',
})

/**
* Multiple routes resolve to \App\Http\Controllers\ProfileController::show, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `show['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const show = {
    '/{lang?}/profile': show0ff0d9b21497290db5b31098cf4c0c79,
    '/{lang?}/account': show0522a72d3a9cbcbb706325c59f4e84dd,
}

const ProfileController = { show }

export default ProfileController