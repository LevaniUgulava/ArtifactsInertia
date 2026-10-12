import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import products from './products'
import categories from './categories'
import collections from './collections'
import media from './media'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
* @see app/Http/Controllers/Admin/AdminDashboardController.php:18
* @route '/admin'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
* @see app/Http/Controllers/Admin/AdminDashboardController.php:18
* @route '/admin'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
* @see app/Http/Controllers/Admin/AdminDashboardController.php:18
* @route '/admin'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::__invoke
* @see app/Http/Controllers/Admin/AdminDashboardController.php:18
* @route '/admin'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    products: Object.assign(products, products),
    categories: Object.assign(categories, categories),
    collections: Object.assign(collections, collections),
    media: Object.assign(media, media),
}

export default admin