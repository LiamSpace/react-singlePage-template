const path = require('path')
const webpack = require('webpack')

const vendors = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router-dom',
    'react-loadable',
    'redux-thunk'
]

//动态链接库
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.resolve(__dirname, '../library'),
        filename: '[name].dll.js',
        library: '[name]_lib',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../library', 'manifest.json'),
            name: '[name]_lib',
            context: path.resolve(__dirname, './')
        })
    ]
}