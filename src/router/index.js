import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from 'vue-router'
const home = () =>
    import ("@/components/Home")
const dashboard = () =>
    import ("@/views/dashboard/index")
const main = () =>
    import ("@/views/dashboard/main/index")

const routes = [{
        path: '/',
        component: home,
        children: [{
            path: '/',
            name: 'dashboard',
            component: main,
            meta: {
                keepAlive: true,
                title: 'Swan'
            }
        }]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: process.env.NODE_ENV === 'testnet' ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    // history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router