const path = require('path');

// PLATFORMS
var variants = [
    {
        target: "web",
        filename: "EasyDebug.browser.js"
    },
    {
        target: "node",
        filename: "EasyDebug.node.js"
    }
];

// CONFIG
var configGenerator = function (target, filename) {
    return {
        entry: './src/main.ts',
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
            minimize: false,
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        target: target, // "web" is default
        output: {
            library: "EasyDebug",
            libraryTarget: "umd",
            filename: filename,
            // globalObject: "this",
            path: path.resolve(__dirname, 'dist')
        }
    };
};

// MAP PLATFORMS WITH CONFIGS
module.exports = variants.map(function(variant){
    return configGenerator(variant.target, variant.filename)
})
