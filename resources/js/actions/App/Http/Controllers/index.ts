import Admin from './Admin'
import HomeController from './HomeController'
import CatalogController from './CatalogController'
import ProductController from './ProductController'
import Auth from './Auth'
import CartController from './CartController'
import FavoritesController from './FavoritesController'
import ProfileController from './ProfileController'
import CheckoutController from './CheckoutController'

const Controllers = {
    Admin: Object.assign(Admin, Admin),
    HomeController: Object.assign(HomeController, HomeController),
    CatalogController: Object.assign(CatalogController, CatalogController),
    ProductController: Object.assign(ProductController, ProductController),
    Auth: Object.assign(Auth, Auth),
    CartController: Object.assign(CartController, CartController),
    FavoritesController: Object.assign(FavoritesController, FavoritesController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
}

export default Controllers