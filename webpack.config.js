const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        },{
            test: /\.cn$/,
            use: './loaders/cn-loader.js',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js', '.cn']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    stats: {
        modules: false
    }
}