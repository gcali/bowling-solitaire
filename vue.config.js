if (process.env.NODE_ENV === "production") {
    module.exports = {
        baseUrl: '/bowling-solitaire',
        configureWebpack: {
            devtool: 'source-map'
        }
    }
}
else {
    module.exports = {
        configureWebpack: {
            devtool: 'source-map'
        }
    }
}
