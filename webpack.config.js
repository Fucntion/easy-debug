const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const args = process.argv
console.log(process.argv)

const plugins = []
const isDev = args.includes('--mode=development')

if (isDev) {
  plugins.push(new HtmlWebpackPlugin({
    template: './development/index.html',
    inject:'head'
  }))
}

function getEntry(){
  return isDev?{'app':'./development/app.ts'}:{
    'EasyDebug': './src/main.ts',
    'EasyDebug.min': './src/main.ts'
  }
}

module.exports = {
  entry: getEntry(),
  devtool: isDev?'eval-source-map':false,
  output: {
    library: {
      name: "EasyDebug",
      type: "umd"
    },
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
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
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        include: /min/
      }),
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
}
