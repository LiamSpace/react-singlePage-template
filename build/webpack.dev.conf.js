const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConf = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');



module.exports = merge(baseWebpackConf, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body',
            minify: {
                html5: true
            },
            hash: false
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:8848`]
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: '8848',
        contentBase: path.join(__dirname, '../public'),
        compress: true, //压缩
        historyApiFallback: true, //当路径匹配的文件不存在时,不出现404，而是应用该配置项
        hot: true, //热更新
        https: false, //不通过https提供服务
        noInfo: true, //包信息将会隐藏
        open: true, //自动打开浏览器
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:3000',
                pathRewrite: { "^api": "" }
            }
        }
    }
})