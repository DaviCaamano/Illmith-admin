const webpack = require('webpack');

module.exports = {
    entry: './src/ArticleManager.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};