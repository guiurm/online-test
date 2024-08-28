import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/IndexView.vue')
        },
        {
            path: '/exam',
            name: 'exam',
            component: () => import('../views/TestView.vue')
        }
    ]
})

export default router
