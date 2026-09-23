import Categories from './Categories'
import Collections from './Collections'
import Products from './Products'

const Resources = {
    Categories: Object.assign(Categories, Categories),
    Collections: Object.assign(Collections, Collections),
    Products: Object.assign(Products, Products),
}

export default Resources