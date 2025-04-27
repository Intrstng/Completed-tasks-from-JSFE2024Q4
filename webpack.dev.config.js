const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map', // devtool: 'eval-source-map'
    devServer: {
        open: true,
        host: 'localhost',
        port: 4100,
        hot: true,
        static: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
    },
};
