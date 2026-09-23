import ListCollections from './ListCollections'
import CreateCollection from './CreateCollection'

const Pages = {
    ListCollections: Object.assign(ListCollections, ListCollections),
    CreateCollection: Object.assign(CreateCollection, CreateCollection),
}

export default Pages