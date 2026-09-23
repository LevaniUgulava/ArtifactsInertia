import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Categories\Pages\ListCategories::__invoke
* @see app/Filament/Resources/Categories/Pages/ListCategories.php:7
* @route '/admin/categories'
*/
const ListCategories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCategories.url(options),
    method: 'get',
})

ListCategories.definition = {
    methods: ["get","head"],
    url: '/admin/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Categories\Pages\ListCategories::__invoke
* @see app/Filament/Resources/Categories/Pages/ListCategories.php:7
* @route '/admin/categories'
*/
ListCategories.url = (options?: RouteQueryOptions) => {
    return ListCategories.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Categories\Pages\ListCategories::__invoke
* @see app/Filament/Resources/Categories/Pages/ListCategories.php:7
* @route '/admin/categories'
*/
ListCategories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCategories.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Categories\Pages\ListCategories::__invoke
* @see app/Filament/Resources/Categories/Pages/ListCategories.php:7
* @route '/admin/categories'
*/
ListCategories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListCategories.url(options),
    method: 'head',
})

export default ListCategories