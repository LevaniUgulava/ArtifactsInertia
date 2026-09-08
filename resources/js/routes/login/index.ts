import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\AuthController::submit
* @see app/Http/Controllers/Auth/AuthController.php:81
* @route '/login'
*/
submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

submit.form = submitForm

const login = {
    submit: Object.assign(submit, submit),
}

export default login