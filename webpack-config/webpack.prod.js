/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const GENERATE_STATS = process.env.GENERATE_STATS === '1';
const ENV = 'production';

const getConfig = require('./webpack.common.js');

const ASSETS_PATH = './assets/';

const commonConfig = getConfig({
    env: ENV,
    folder: ASSETS_PATH
});

const config = webpackMerge.smart(commonConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: false
                    }
                },
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: ASSETS_PATH + '[name].[ext]' }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
});

GENERATE_STATS && (config.plugins.push(new Visualizer()));

module.exports = config;
