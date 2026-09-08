import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see routes/web.php:22
* @route '/password/update'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(options),
    method: 'get',
})

update.definition = {
    methods: ["get","head"],
    url: '/password/update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:22
* @route '/password/update'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see routes/web.php:22
* @route '/password/update'
*/
update.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: update.url(options),
    method: 'get',
})

/**
* @see routes/web.php:22
* @route '/password/update'
*/
update.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: update.url(options),
    method: 'head',
})

const password = {
    update: Object.assign(update, update),
}

export default password