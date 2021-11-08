module.exports = {
    publicPath: "stock-trader",
    devServer: {
        port: 9000 ,
        proxy: {
            '/api':
            {
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }    
        }
    }
}