var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var isDebug = false;
var isTest = isDebug ? './test.js' : './empty.js';
module.exports = {
    entry: {
        index: ['./TDSC.js',isTest],
       // test:[isTest]
    },
    output: {
        path: __dirname,
        filename: './dist/TDSC.min.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader'
        }  ]
    },
    plugins: [commonsPlugin]
};