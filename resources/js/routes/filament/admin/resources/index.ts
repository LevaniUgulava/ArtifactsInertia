import categories from './categories'
import collections from './collections'
import products from './products'

const resources = {
    categories: Object.assign(categories, categories),
    collections: Object.assign(collections, collections),
    products: Object.assign(products, products),
}

export default resources