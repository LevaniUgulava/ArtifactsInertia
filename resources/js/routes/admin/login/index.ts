import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:106
* @route '/admin/login'
*/
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:106
* @route '/admin/login'
*/
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:106
* @route '/admin/login'
*/
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

const login = {
    submit: Object.assign(submit, submit),
}

export default login