import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
const CreateCollection = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateCollection.url(options),
    method: 'get',
})

CreateCollection.definition = {
    methods: ["get","head"],
    url: '/admin/collections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
CreateCollection.url = (options?: RouteQueryOptions) => {
    return CreateCollection.definition.url + queryParams(options)
}

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
CreateCollection.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CreateCollection.url(options),
    method: 'get',
})

/**
* @see \App\Filament\Resources\Collections\Pages\CreateCollection::__invoke
* @see app/Filament/Resources/Collections/Pages/CreateCollection.php:7
* @route '/admin/collections/create'
*/
CreateCollection.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CreateCollection.url(options),
    method: 'head',
})

export default CreateCollection