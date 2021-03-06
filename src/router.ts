import Vue from 'vue';
import Router, {Route} from 'vue-router';
import store from '@/store/index';
import Dashboard from './pages/dashboard/Dashboard.vue';
import DashboardHome from './pages/dashboard/home/Home.vue';
import {ResponseInterface} from '@/interfaces/response.interface';
import { userService } from '@/module';

Vue.use(Router);

async function autoLogIn({ next }: any): Promise<void> {
    try {
        const response: ResponseInterface = await store.dispatch('isLoggedIn');

        if (response.success) {
            next({ name: 'dashboard' });
        }

        next();
    } catch (error) {
        next('/login');
    }
}

async function auth({ next }: any): Promise<void> {
    try {
        const response: ResponseInterface = await store.dispatch('isLoggedIn');

        if (response.success) {
            next();
        } else {
            if (response.msg === process.env.VUE_APP_VERIFY) {
                next(`/verify/${response.data.token}`);
            } else {
                next('/login');
            }
        }
    } catch (error) {
        next('/login');
    }
}

function initStore() {
    if (!Object.keys(store.state.User.user).length) {
        store.dispatch('isLoggedIn');
    }

    store.dispatch('getYearlyAggregations');
    store.dispatch('getUnpaidBillTotals');
    store.dispatch('getAllBudgetTemplates');
    store.dispatch('getAllBudgets');
    store.dispatch('getAllBillTypes');
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'login',
            },
        },
        {
            path: '/login',
            name: 'onboard',
            component: () => import('@/pages/onboard/Onboard.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    meta: {
                        middleware: [autoLogIn],
                    },
                    component: () => import('@/pages/onboard/login/Login.vue'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/pages/onboard/register/Register.vue'),
                },
                {
                    path: '/forgot-password',
                    name: 'forgot-password',
                    component: () => import('@/pages/onboard/forgot-my-password/ForgotMyPassword.vue'),
                },
                {
                    path: '/account-reset/:token',
                    name: 'account-reset',
                    beforeEnter: (to: Route, from: Route, next: any) => {
                        userService
                            .validateToken(to.params.token)
                            .then((res: ResponseInterface) => {
                                if (res.success) {
                                    next();
                                } else {
                                    next({ name: 'login' });
                                }
                            })
                            .catch(() => {
                                next({ name: 'login' });
                            });
                    },
                    component: () => import('@/pages/onboard/account-reset/AccountReset.vue'),
                },
                {
                    path: '/account-reset/**',
                    redirect: {
                        name: 'login',
                    },
                },
                {
                    path: '/verify/:token',
                    name: 'verify',
                    beforeEnter: async (to: Route, from: Route, next: any) => {
                        try {
                            const response: ResponseInterface = await store.dispatch('isLoggedIn');

                            if (!response.success && response.msg !== process.env.VUE_APP_VERIFY) {
                                next('/login');
                            }

                            const tokenResponse = await userService
                                .validateVerifyToken(to.params.token, store.state.User.user.user_id ?? '');

                            if (!tokenResponse.success) {
                                next('/login');
                            }

                            store.commit('SET_VERIFY_EXPIRATION', tokenResponse.data.expires_at);
                            next();
                        } catch (e) {
                            next('/login');
                        }
                    },
                    component: () => import('@/pages/onboard/verify/Verify.vue'),
                },
                {
                    path: '/verify/**',
                    redirect: {
                        name: 'login',
                    },
                },
            ],
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                middleware: [auth],
            },
            beforeEnter: (to: Route, from: Route, next: any) => {
                initStore();
                next();
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardHome,
                    meta: {
                        middleware: [auth],
                    },
                },
                {
                    path: 'budget',
                    name: 'budget-list',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/budget/list/List.vue'),
                },
                {
                    path: 'budget/edit/:id',
                    name: 'budget-edit',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/budget/edit/Edit.vue'),
                },
                {
                    path: 'budget/template',
                    name: 'budget-template',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/budget/template/Template.vue'),
                },
                {
                    path: 'profile',
                    name: 'profile',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/profile/Profile.vue'),
                },
                {
                    path: 'search',
                    name: 'search',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/search/Search.vue'),
                },
                {
                    path: '*',
                    name: '404',
                    meta: {
                        middleware: [auth],
                    },
                    component: () => import('@/pages/dashboard/errors/404/404.vue'),
                },
            ],
        },
    ],
});

router.beforeEach((to: Route, from: Route, next: any) => {
    if (to.meta.hasOwnProperty('middleware')) {
        const context = {next, to, from};
        to.meta.middleware.map((mw: any, index: number) => {
            if (typeof mw === 'function') {
                mw(context);
            }
        });
    } else {
        next();
    }
});

export default router;
