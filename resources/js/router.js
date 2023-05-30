import { createWebHistory, createRouter } from 'vue-router'
import store from '@/js/store.js'
import Login from '@/js/components/Login.vue'
import Register from '@/js/components/Register.vue'
import Home from '@/js/components/Home.vue'

const routes = [
    {
        name: "login",
        path: "/",
        component: Login,
        meta: {
            middleware: "guest",
            title: "Login"
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: "Register"
        }
    },
    {
        name: "home",
        path: "/home",
        component: Home,
        meta: {
            middleware: "auth",
            title: "Home" 
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            document.title = "Welcome, "+store.state.auth?.user?.username
            next({ name: "home" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            document.title = "Welcome, "+store.state.auth?.user?.username
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router
