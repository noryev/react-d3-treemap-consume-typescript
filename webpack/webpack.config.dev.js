///////////////////////////////////////////////////////////////////////////////////////////////////
//  WebPack 2 PROD Config
///////////////////////////////////////////////////////////////////////////////////////////////////
//  author: Jose Quinto - https://blogs.josequinto.com edited by Noryev @ GalaxyX.io
///////////////////////////////////////////////////////////////////////////////////////////////////
//  Treemap a users local IPFS node
///////////////////////////////////////////////////////////////////////////////////////////////////
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
    // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
    devtool: 'inline-source-map',
    target: 'web',
    entry: {
        'bundle': [
            // activate HMR for React
            'react-hot-loader/patch',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            'webpack-dev-server/client?http://127.0.0.1:5001/webui',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            // Our app main entry
            './app/src/index.tsx'
        ]
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: '[name].js',
        // necessary for HMR to know where to load the hot update chunks
        publicPath: '/'
    },

    devServer: {
        // All options here: https://webpack.js.org/configuration/dev-server/

        // enable HMR on the server
        hot: true,
        // match the output path
        contentBase: resolve(__dirname, '../dist'),
        // match the output `publicPath`
        publicPath: '/',

        // Enable to integrate with Docker
        //host:"0.0.0.0",

        port: 3000,
        historyApiFallback: true,
        // All the stats options here: https://webpack.js.org/configuration/stats/
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
            'errors-only': true
        }
    },

    context: resolve(__dirname, '../'),
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()
    ],
    watchOptions: {
       poll: true
    },
    module: {
        // loaders -> rules in webpack 2
        rules: [
            // Once TypeScript is configured to output source maps we need to tell webpack
            // to extract these source maps and pass them to the browser,
            // this way we will get the source file exactly as we see it in our code editor.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: '/node_modules/'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: '/node_modules/'
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.ts(x?)$/,
                use: [
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'ts-loader' }
                ],
                include: resolve(__dirname, './../app/src')
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};
