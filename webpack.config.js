const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        filename: 'wechat-app-compat.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    }
};
