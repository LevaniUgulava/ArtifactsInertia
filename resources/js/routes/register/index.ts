import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:63
* @route '/register'
*/
submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

submit.form = submitForm

const register = {
    submit: Object.assign(submit, submit),
}

export default register