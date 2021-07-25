import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Movies from '../views/Movies.vue'
import Play from '../views/Play.vue'
import Anime from '../views/Anime.vue'
import AdvancedSearch from '../views/Advanced-Search.vue'
import EditProfile from '../views/Edit-Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Conditions from '../views/Conditions.vue'
import Privacy from '../views/Privacy.vue'
import DeleteAccount from '../views/Delete-Account.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/advanced-search',
    name: 'Advanced-Search',
    component: AdvancedSearch
  },
  {
    path: '/delete-account',
    name: 'Delete-Account',
    component: DeleteAccount
  },
  {
    path: '/edit-profile',
    name: 'Edit-Profile',
    component: EditProfile
  },
  {
    path: '/conditions',
    name: 'Conditions',
    component: Conditions
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/anime/:id',
    name: 'Anime',
    component: Anime
  },
  {
    path: '/anime/:id/play/:cap',
    name: 'Play',
    component: Play
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router