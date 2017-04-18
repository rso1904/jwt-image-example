var webpack = require('webpack');
var path = require('path');

module.exports = {

    /* webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 땐, 
    HotReloadingModule 를 사용하기 위해선 dev-server 클라이언트와 
    핫 모듈을 따로 entry 에 넣어주어야 합니다. */

    entry: [
        'babel-polyfill',
        './src/index.js',
        './src/style.css'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    },

    resolve: {
        root: path.resolve('./src')
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};
