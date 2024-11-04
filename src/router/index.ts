import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authMiddleware'

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
            path: '/auth/signup',
            name: 'auth.signup',
            component: () => import('../views/auth/RegisterView.vue')
        },
        {
            path: '/auth/signin',
            name: 'auth.signin',
            component: () => import('../views/auth/LoginView.vue')
        },
        //dashboard
        {
            path: '/dashboard',
            component: () => import('@/views/dashboard/DashboardWrapper.vue'),
            name: 'dashboard.wrapper',
            meta: { requireLogin: true },
            children: [
                {
                    path: '',
                    name: 'dashboard.index',
                    component: () => import('@/views/dashboard/DashboardIndex.vue')
                },
                {
                    path: 'exam/new',
                    name: 'dashboard.exam.new',
                    component: () => import('@/views/dashboard/exam/ExamCreate.vue')
                },
                {
                    path: 'exam/:examId',
                    name: 'dashboard.exam.edit',
                    props: true,
                    component: () => import('@/views/dashboard/exam/ExamEdit.vue')
                },
                {
                    path: 'exam/user/list',
                    name: 'dashboard.exam.list',
                    component: () => import('@/views/dashboard/exam/ExamsByUserView.vue')
                },
                // question
                {
                    path: 'question/user/list',
                    name: 'dashboard.question.list',
                    component: () => import('@/views/dashboard/question/QuestionList.vue')
                },
                {
                    path: 'question/user/:questionKeycode',
                    name: 'dashboard.question.edit',
                    component: () => import('@/views/dashboard/question/QuestionEdit.vue')
                },
                {
                    path: 'question/user/add',
                    name: 'dashboard.question.add',
                    component: () => import('@/views/dashboard/question/QuestionCreate.vue')
                }
            ]
        }
        /*{
            path: '/exam/new',
            meta: { requireLogin: true },
            name: 'exam.new',
            component: () => import('../views/exam/ExamCreate.vue')
        },
        {
            path: '/exam/:examId',
            meta: { requireLogin: true },
            name: 'exam.edit',
            props: true,
            component: () => import('../views/exam/ExamEdit.vue')
        },
        {
            path: '/exam',
            meta: { requireLogin: true },
            name: 'exam.list',
            component: () => import('../views/exam/ExamsByUserView.vue')
        },
        {
            path: '/test',
            meta: { requireLogin: true },
            name: 'test',
            component: () => import('../views/TestV.vue')
        }*/
    ]
})

router.beforeEach(async (to, from, next) => {
    if (await authGuard(to, from, next)) {
        next()
    } else {
        return next('/auth/signin')
    }
})

export default router
