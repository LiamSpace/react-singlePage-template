const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConf = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = merge(baseWebpackConf, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 5 version']
                                })
                            ]
                        }
                    }
                ],
                include: [path.resolve(__dirname, "../src")],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                    'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 5 version']
                            })
                        ]
                    },
                },
                    'sass-loader'
                ],
                include: [path.resolve(__dirname, "../src")],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyWebpackPlugin(
            {
                parallel: true
            }
        )],
        // 分割代码 拆分包
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libs: {
                    name: "chunks-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" //打包初始时依赖的第三方
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: "body",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            publicPath: '../',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order),
        }),
        new CompressionWebpackPlugin(),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    performance: {
        // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
        hints: "warning",
        // 开发环境设置较大防止警告
        // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
        maxEntrypointSize: 5000000,
        // 最大单个资源体积，默认250000 (bytes)
        maxAssetSize: 3000000
    }
})
