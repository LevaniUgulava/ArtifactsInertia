import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Collections\Pages\ListCollections::__invoke
* @see app/Filament/Resources/Collections/Pages/ListCollections.php:7
* @route '/admin/collections'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/collections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

const collections = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
}

export default collections