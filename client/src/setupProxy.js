// 1. npm install http-porxy-middleware 설치
// 2. 이후 설정을 위해서 setupProxy.js 생성
const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000", // 3000번에서 데이터를 줄 때 5000번 포트로
            changeOrigin: true,
        })
    )
}
