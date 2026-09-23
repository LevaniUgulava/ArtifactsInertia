import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
const ListCollections = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCollections.url(options),
    method: 'get',
})

ListCollections.definition = {
    methods: ["get","head"],
    url: '/admin/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
ListCollections.url = (options?: RouteQueryOptions) => {
    return ListCollections.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
ListCollections.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ListCollections.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
ListCollections.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ListCollections.url(options),
    method: 'head',
})

export default ListCollections