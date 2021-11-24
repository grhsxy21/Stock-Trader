module.exports = {
    publicPath: "stock-trader",
    devServer: {
        host: 'localhost',
        port: 8080 ,
        open: true,
        /*proxy: {
            '/api':
            {
                target: 'http://127.0.0.1:8000',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }    
        }*/
    }
}