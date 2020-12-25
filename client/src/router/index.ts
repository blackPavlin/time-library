import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: {
      title: 'Main',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout.vue'),
    meta: {
      title: 'Logout',
      requiresAuth: true,
    },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/views/Registration.vue'),
    meta: {
      title: 'Registration',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      requiresAuth: true,
    },
  },
  {
    path: '/tasks',
    name: 'Tacks',
    component: () => import('@/views/Tasks.vue'),
    meta: {
      title: 'Tacks',
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuth) {
      next();
    } else {
      next({
        path: '/login',
        query: { message: 'login' },
      });
    }
  } else {
    next();
  }
});

export default router;
