const path = require('path');

const webpack = require('webpack');

module.exports = {
    entry: './base-ui.js',
    output: {
        filename: 'base-ui.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
    	rules: [
    		{
		        test: /\.vue$/,
		        loader: 'vue-loader'
		    }
    	]
    },
    // plugins: [new webpack.optimize.UglifyJsPlugin()]
}
