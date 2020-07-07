const { resolve } = require('path');
const apiMocker = require('connect-api-mocker');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        polyfill: '@babel/polyfill',
        main: resolve(__dirname, 'src/main')
    },
    output: {
        path: resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            '@': resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader'},
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                        prependData: `
                            @import "./src/scss/_variables.scss";
                        `
                    }
                  }
                ]
              }
        ]
    },
    devServer: {
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/jokes': {
                target: 'http://api.icndb.com/jokes/',
                ws: true,
                changeOrigin: true
            }
        },
        before: function(app) {
            app.use(apiMocker('/api', 'mocks/api'));
        }
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "./index.html",
            title: 'Vue Jokes App'
        })
    ]
}