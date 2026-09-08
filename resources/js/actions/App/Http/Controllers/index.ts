import Auth from './Auth'
import CartController from './CartController'
import ProfileController from './ProfileController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    CartController: Object.assign(CartController, CartController),
    ProfileController: Object.assign(ProfileController, ProfileController),
}

export default Controllers