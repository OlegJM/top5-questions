/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

const frontendServerPort = 8088;
const frontendServerHost = 'localhost';

webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${frontendServerHost}:${frontendServerPort}`);

const devServerConfig = {
    contentBase: webpackConfig.output.path,
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    open: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true }
};

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');
    webpackConfig.entry.app.unshift('react-hot-loader/patch');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    devServerConfig.hot = true;
}

const frontendCompiler = webpack(webpackConfig);


const frontendServer = new WebpackDevServer(frontendCompiler, devServerConfig);

frontendServer.listen(frontendServerPort, frontendServerHost, () => {
    console.log(`Frontend server running at ${frontendServerHost}:${frontendServerPort}...`);
});
