import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
export const update = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(args, options),
    method: 'get',
})

update.definition = {
    methods: ["get","head"],
    url: '/{lang?}/password/update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
update.url = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{lang?}', parsedArgs.lang?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
update.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
update.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: update.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
const updateForm = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
updateForm.get = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::update
* @see app/Http/Controllers/Auth/AuthController.php:47
* @param lang - Default: 'en'
* @route '/{lang?}/password/update'
*/
updateForm.head = (args?: { lang?: string | number } | [lang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

update.form = updateForm

const password = {
    update: Object.assign(update, update),
}

export default password