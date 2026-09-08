import Auth from './Auth'
import CartController from './CartController'
import ProfileController from './ProfileController'
import CheckoutController from './CheckoutController'
import CatalogController from './CatalogController'
import ProductController from './ProductController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    CartController: Object.assign(CartController, CartController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
    CatalogController: Object.assign(CatalogController, CatalogController),
    ProductController: Object.assign(ProductController, ProductController),
}

export default Controllers