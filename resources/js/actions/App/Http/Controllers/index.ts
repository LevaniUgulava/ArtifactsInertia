import Auth from './Auth'
import CartController from './CartController'
import FavoritesController from './FavoritesController'
import ProfileController from './ProfileController'
import CheckoutController from './CheckoutController'
import CatalogController from './CatalogController'
import ProductController from './ProductController'
import HomeController from './HomeController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    CartController: Object.assign(CartController, CartController),
    FavoritesController: Object.assign(FavoritesController, FavoritesController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
    CatalogController: Object.assign(CatalogController, CatalogController),
    ProductController: Object.assign(ProductController, ProductController),
    HomeController: Object.assign(HomeController, HomeController),
}

export default Controllers