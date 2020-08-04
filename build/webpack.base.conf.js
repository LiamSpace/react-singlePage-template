const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src/main.js"),
        // framework: ['react', 'react-dom'] //分离业务代码和公共代码
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, '../src/'),
                exclude: /node_modules/
            },
            //处理图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i, //图片文件
                use: [
                    {
                        //url 转换成base64 ,超过限制使用file-loader
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[path][name].[ext]',
                                    publicPath: '../',
                                }
                            },
                            // 启用CommonJS模版语法
                            esModule: false
                        },
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[path][name].[ext]',
                                    publicPath: '../'
                                }
                            },
                            //启用CommonJS语法
                            esModule: false
                        },
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[path][name].[ext]',
                                    publicPath: '../'
                                }
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // 拷贝静态资源
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../static"),
            to: path.resolve(__dirname, "../dist/static")
        }]),
        //定义全局变量
        new webpack.DefinePlugin({
            // 'React': 'react'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, '../library', 'manifest.json')),
            context: path.resolve(__dirname, './')
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../assets'),
            'static': path.resolve(__dirname, '../static'),
            'components': path.resolve(__dirname, '../src/components'),
            'containers': path.resolve(__dirname, '../src/containers')
        },
        extensions: ['.js', '.jsx']
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minChunks: 1,
    //         minSize: 0,
    //         cacheGroups: {
    //             framework: {
    //                 test: 'framework', //可为字符串，正则表达式，函数等形式，匹配入口文件当中需要提出来的公共库，并且从入口文件当中抽离。
    //                 name: 'framework',
    //                 enforce: true
    //             }
    //         }
    //     }
    // }
}