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
            path: '/exam/editor',
            name: 'exam.editor',
            component: () => import('../views/ExamEdit.vue')
        },
        {
            path: '/doc/ia',
            name: 'doc.ia',
            component: () => import('../views/DocView.vue')
        }
    ]
})

export default router
