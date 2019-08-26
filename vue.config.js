const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? '/bowling-solitaire' : "/",
    configureWebpack: config => {
        config.devtool = 'source-map';
        config.entry = {
            app: [
                './src/client/main.ts'
            ]
        };
        config.resolve.alias = {
            "@common": path.resolve(__dirname, "src/common"),
            "@client": path.resolve(__dirname, "src/client")
        }
    }
}
