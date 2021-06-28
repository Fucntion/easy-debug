const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    entry: {
        'EasyDebug':'./src/main.ts',
        'EasyDebug.min':'./src/main.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader','ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer:[
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                },
                include:/min/
            }),
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias:{
            '@':path.resolve(__dirname,'src')
        }
    },
    output: {
        library: {
            name:"EasyDebug",
            type:"umd"
        },
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
