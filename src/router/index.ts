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
        },
        {
            path: '/auth/register',
            name: 'auth.register',
            component: () => import('../views/auth/RegisterView.vue')
        },
        {
            path: '/auth/signin',
            name: 'auth.signin',
            component: () => import('../views/auth/LoginView.vue')
        },
        {
            path: '/exam/new',
            name: 'exam.new',
            component: () => import('../views/exam/ExamCreate.vue')
        },
        {
            path: '/exam',
            name: 'exam.list',
            component: () => import('../views/exam/ExamsByUserView.vue')
        }
    ]
})

export default router
