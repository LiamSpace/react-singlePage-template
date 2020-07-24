import loadable from '@/utils/loadable'


export const router = [
    {
        path: '/',
        exact: true,
        component: loadable(() => import('../containers/home.js'))
    },
    {
        path: '/detail',
        exact: true,
        component: loadable(() => import('../containers/detail.js'))
    },
    {
        path: '/table',
        exact: true,
        component: loadable(() => import('../containers/table.js'))
    }
]