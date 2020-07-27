import React from 'react'
import ReactDom from 'react-dom';
import Layout from '@/Layout.js'
import { Provider } from 'react-redux'
import store from './store/index'
import '@/utils/print.js'

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('root')
)
