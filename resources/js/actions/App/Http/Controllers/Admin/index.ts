import AdminDashboardController from './AdminDashboardController'
import ProductController from './ProductController'
import CategoryController from './CategoryController'
import CollectionController from './CollectionController'
import MediaController from './MediaController'

const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
    ProductController: Object.assign(ProductController, ProductController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    CollectionController: Object.assign(CollectionController, CollectionController),
    MediaController: Object.assign(MediaController, MediaController),
}

export default Admin