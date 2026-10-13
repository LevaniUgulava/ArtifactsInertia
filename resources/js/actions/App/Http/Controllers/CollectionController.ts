import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CollectionController::index
* @see app/Http/Controllers/CollectionController.php:19
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
* @see \App\Http\Controllers\CollectionController::index
* @see app/Http/Controllers/CollectionController.php:19
* @route '/admin/collections'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::index
* @see app/Http/Controllers/CollectionController.php:19
* @route '/admin/collections'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CollectionController::index
* @see app/Http/Controllers/CollectionController.php:19
* @route '/admin/collections'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CollectionController::create
* @see app/Http/Controllers/CollectionController.php:29
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
* @see \App\Http\Controllers\CollectionController::create
* @see app/Http/Controllers/CollectionController.php:29
* @route '/admin/collections/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::create
* @see app/Http/Controllers/CollectionController.php:29
* @route '/admin/collections/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CollectionController::create
* @see app/Http/Controllers/CollectionController.php:29
* @route '/admin/collections/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CollectionController::store
* @see app/Http/Controllers/CollectionController.php:34
* @route '/admin/collections'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/collections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CollectionController::store
* @see app/Http/Controllers/CollectionController.php:34
* @route '/admin/collections'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::store
* @see app/Http/Controllers/CollectionController.php:34
* @route '/admin/collections'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CollectionController::edit
* @see app/Http/Controllers/CollectionController.php:41
* @route '/admin/collections/{collection}/edit'
*/
export const edit = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/collections/{collection}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CollectionController::edit
* @see app/Http/Controllers/CollectionController.php:41
* @route '/admin/collections/{collection}/edit'
*/
edit.url = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { collection: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { collection: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            collection: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        collection: typeof args.collection === 'object'
        ? args.collection.id
        : args.collection,
    }

    return edit.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::edit
* @see app/Http/Controllers/CollectionController.php:41
* @route '/admin/collections/{collection}/edit'
*/
edit.get = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CollectionController::edit
* @see app/Http/Controllers/CollectionController.php:41
* @route '/admin/collections/{collection}/edit'
*/
edit.head = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CollectionController::update
* @see app/Http/Controllers/CollectionController.php:46
* @route '/admin/collections/{collection}'
*/
export const update = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CollectionController::update
* @see app/Http/Controllers/CollectionController.php:46
* @route '/admin/collections/{collection}'
*/
update.url = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { collection: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { collection: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            collection: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        collection: typeof args.collection === 'object'
        ? args.collection.id
        : args.collection,
    }

    return update.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::update
* @see app/Http/Controllers/CollectionController.php:46
* @route '/admin/collections/{collection}'
*/
update.put = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CollectionController::update
* @see app/Http/Controllers/CollectionController.php:46
* @route '/admin/collections/{collection}'
*/
update.patch = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CollectionController::destroy
* @see app/Http/Controllers/CollectionController.php:53
* @route '/admin/collections/{collection}'
*/
export const destroy = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/collections/{collection}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CollectionController::destroy
* @see app/Http/Controllers/CollectionController.php:53
* @route '/admin/collections/{collection}'
*/
destroy.url = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { collection: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { collection: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            collection: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        collection: typeof args.collection === 'object'
        ? args.collection.id
        : args.collection,
    }

    return destroy.definition.url
            .replace('{collection}', parsedArgs.collection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CollectionController::destroy
* @see app/Http/Controllers/CollectionController.php:53
* @route '/admin/collections/{collection}'
*/
destroy.delete = (args: { collection: string | number | { id: string | number } } | [collection: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const CollectionController = { index, create, store, edit, update, destroy }

export default CollectionController