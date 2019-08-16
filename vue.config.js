module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? '/bowling-solitaire' : "/",
    configureWebpack: {
        devtool: 'source-map'
    }
}
