var webpack = require('webpack');
var path = require('path');

module.exports = {

    /* webpack-dev-server�� �ܼ��� �ƴ� �ڹٽ�ũ��Ʈ�� ���� �� ��, 
    HotReloadingModule �� ����ϱ� ���ؼ� dev-server Ŭ���̾�Ʈ�� 
    �� ����� ���� entry �� �־��־�� �մϴ�. */

    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4000', // ���߼����� ��Ʈ�� �� �κп� �ԷµǾ�� ����� �۵��մϴ�
        'webpack/hot/only-dev-server',
        './src/style.css'
    ],

    output: {
        path: '/', // public �� �ƴϰ� /, �̷��� �ϸ� ������ �޸𸮿� �����ϰ� ����մϴ�
        filename: 'bundle.js'
    },

    //���߼��� �����Դϴ�
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentsBase: './public',
        /* ��� ��û�� ���Ͻ÷� ������ express�� ������ �޾ƿ���,
        bundle ������ ��쿣 �켱���� ������ devserver�� ��ũ��Ʈ�� ����ϰ� �˴ϴ� */
        proxy: {
            "**": "http://localhost:3000" //express �����ּ�
        },
        stats: {
            // �ܼ� �α׸� �ּ�ȭ�մϴ�.
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
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
    }
    
};
