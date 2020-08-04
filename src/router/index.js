import loadable from '@/utils/loadable'


export const router = [
    {
        path: '/',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Home" */'../containers/home.js'))
    },
    {
        path: '/detail',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Detail" */'../containers/detail.js'))
    },
    {
        path: '/table',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "Table" */'../containers/table.js'))
    }
]