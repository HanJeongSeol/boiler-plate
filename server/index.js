const express = require("express") // 모듈 불러오기
const app = express() // 함수 사용해서 새로운 express 생성
const port = 5000 // 5000번 포트 사용
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const config = require("./config/key")
// cors module를 사용한 cors 이슈 해결
// const cors = require("cors")

const { auth } = require("./middleware/auth")
const { User } = require("./Models/User") // DB model 호출

// bodyparser이 클라이언트에서 가져온 정보를 서버에서 분석할 수 있게

// application/x-www-from-urlencoded -> url 정보 가져옴
app.use(bodyParser.urlencoded({ extended: true }))

//application/json -> json타입 가져옴
app.use(bodyParser.json())
app.use(cookieParser())

// cors module를 사용
// let cors_origin = ["http://localhost:3000"]

// app.use(
//     cors({
//         origin: cors_origin, // 연동하려는 주소
//         credentials: true, // response 헤더 추가
//     })
// )

const mongoose = require("mongoose")
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDb connexted.."))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("Hello World!~~~~")
})

// 회원가입 route 생성
app.post("/api/users/register", (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    // body는 json 형식으로 데이터가 들어온다-> bodyparser의 역할
    const user = new User(req.body)
    //userInfo : 저장된 유저 정보 가짐
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err }) // error발생 시 json 형식으로 sucess:false 전달 후 err 메서지도 전달.
        return res.status(200).json({ success: true }) // http 200 : success
    }) // 정보들이 user모델에 저장이 된다.
})

app.post("/api/users/login", (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            })
        }
        // 요청된 이메일이 데이터베이스에 있으면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            // 비밀번호가 일치하면 토큰생성. jsonwebtoken
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // token을 저장한다. 쿠키, 로컬스토리지 등등, 클라이언트에 성공 메시지 전달
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

// Auth기능 만들기. 권한설정 토큰에 유저 정보를 저장하고 쿠키에 넣었다. 서버에서는 유저 db에 저장
// auth middleware 사용. callback하기전에 중간에서 처리하는 역할
app.get("/api/users/auth", auth, (req, res) => {
    // 미들웨어를 통과하면 아래 코드가 시작.
    // 아래 코드가 시작이 된다면 authentication이 true
    // json형태로 유저 정보 전달 필요
    // auth에서 user정보를 req에 넣었기 때문에 아래와같이 사용이 가능하다.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
})

// 로그아웃 하려는 유저를 데이터베이스에서 찾아서 그 유저의 토큰을 삭제한다.
// get(경로, middleware, req,res)
// auth에서 클라이언트의 토큰과 db의 토큰과 비교함으로서 인증을 진행했기 때문에
// db의 토큰을 삭제하면 클라이언트의 쿠키와 다르기 때문에 인증이 안되서 로그인 기능이 풀리게된다.
app.get("/api/users/logout", auth, (req, res) => {
    // 유저를 탐색해서 update. findOneAndUpdate() : db update
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
            success: true,
        })
    })
})

app.get("/api/hello", (req, res) => {
    res.send("hi front")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
