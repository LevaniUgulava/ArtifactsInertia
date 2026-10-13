import DashboardController from './DashboardController'
import ProductController from './ProductController'
import CategoryController from './CategoryController'
import CollectionController from './CollectionController'
import MediaController from './MediaController'
import HomeController from './HomeController'
import CatalogController from './CatalogController'
import Auth from './Auth'
import CartController from './CartController'
import FavoritesController from './FavoritesController'
import ProfileController from './ProfileController'
import CheckoutController from './CheckoutController'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProductController: Object.assign(ProductController, ProductController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    CollectionController: Object.assign(CollectionController, CollectionController),
    MediaController: Object.assign(MediaController, MediaController),
    HomeController: Object.assign(HomeController, HomeController),
    CatalogController: Object.assign(CatalogController, CatalogController),
    Auth: Object.assign(Auth, Auth),
    CartController: Object.assign(CartController, CartController),
    FavoritesController: Object.assign(FavoritesController, FavoritesController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    CheckoutController: Object.assign(CheckoutController, CheckoutController),
}

export default Controllers