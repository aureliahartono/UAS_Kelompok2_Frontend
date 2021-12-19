import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path) {
  return () => import(`./components/${path}.vue`)
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      meta: {title: 'Home'},
      component: importComponent('Home'),
    },
    {
      path: "/login",
      name: "login",
      meta: {title: 'Login'},
      component: importComponent('auth/Login'),
    },
    {
      path: "/register",
      name: "register",
      meta: {title: 'Register'},
      component: importComponent('auth/Register'),
    },
    {
        path: "/verified",
        name: "verified",
        meta: {title: 'Sign Up [Verified]'},
        component: importComponent('auth/Verified'),
    },
    {
      path: "/unverified",
      name: "unverified",
      meta: {title: 'Sign Up [Unverified]'},
      component: importComponent('auth/Unverified'),
    },
    {
      path: "/products",
      name: "products",
      meta: {title: 'Products'},
      component: importComponent('products/Products'),
    },
    {
      path: "/detailproduct",
      name: "detailProducts",
      meta: {title: 'Detail Product'},
      component: importComponent('products/DetailProduct'),
    },
    {
      path: "/shoppingcart",
      name: "shoppingcart",
      meta: {title: 'Shopping Cart'},
      component: importComponent('products/ShoppingCart'),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {title: 'Profile'},
      component: importComponent('profile/Profile'),
    },
    {
      path: "/editprofile",
      name: "editProfile",
      meta: {title: 'Edit Profile'},
      component: importComponent('profile/EditProfile'),
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: "/",
      name: "admin",
      meta: {title: 'Admin'},
      component: importComponent('DashboardLayout'),
      children: [
          {
              path: "/adminuser",
              name: "adminuser",
              meta: {title: 'User - Admin'},
              component: importComponent('admin/User'),
          },
          {
              path:"/adminproducts",
              name: "adminproducts",
              meta: {title: 'Product - Admin'},
              component: importComponent('admin/Products'),
          },
          {
              path:"/admintransaction",
              name: "admintransaction",
              meta: {title: 'Transaction - Admin'},
              component: importComponent('admin/Transaction'),
          },
          {
              path:"/adminbranch",
              name: "adminbranch",
              meta: {title: 'Branch - Admin'},
              component: importComponent('admin/Branch'),
          },
      ]
  },
  ],
});

//set judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router