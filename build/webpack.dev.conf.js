const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseWebpackConf = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');



module.exports = merge(baseWebpackConf, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 5 version']
                            })
                        ]
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/,
                use:
                    ['style-loader', 'css-loader', 'sass-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: ['last 5 version']
                                    })
                                ]
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body',
            minify: {
                html5: true
            },
            hash: false,
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://localhost:8848`]
            }
        }),

    ],
    devServer: {
        host: 'localhost',
        port: '8848',
        contentBase: path.join(__dirname, '../'),
        compress: true, //压缩
        historyApiFallback: true, //当路径匹配的文件不存在时,不出现404，而是应用该配置项
        hot: true, //热更新
        https: false, //不通过https提供服务
        noInfo: true, //包信息将会隐藏
        open: true, //自动打开浏览器
        proxy: {
            "/api": {
                target: 'http://www.baidu.com',
                pathRewrite: { "^api": "" }
            }
        },
    },
})