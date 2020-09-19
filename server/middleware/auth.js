const { User } = require("../Models/User")
let auth = (req, res, next) => {
    // 인증 처리 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다. cookie-parser 사용
    let token = req.cookies.x_auth

    // 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({ isAuth: false, error: true })

        // 유저가 있는 경우
        req.token = token
        req.user = user
        next() // middleware를 탈출하기위해서
    })

    // user models에서 메서드를 생성해서 사용

    // 유저가 있으면 인증 완료, 없으면 인증 불가
}

module.exports = { auth }
