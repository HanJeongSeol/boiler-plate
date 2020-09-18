const express = require("express") // 모듈 불러오기
const app = express() // 함수 사용해서 새로운 express 생성
const port = 5000 // 5000번 포트 사용
const bodyParser = require("body-parser")
const { User } = require("./models/User") // DB model 호출

// bodyparser이 클라이언트에서 가져온 정보를 서버에서 분석할 수 있게

// application/x-www-from-urlencoded -> url 정보 가져옴
app.use(bodyParser.urlencoded({ extended: true }))

//application/json -> json타입 가져옴
app.use(bodyParser.json())

const mongoose = require("mongoose")
mongoose
    .connect({ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("MongoDb connexted.."))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("Hello World!~~~~")
})

// 회원가입 route 생성
app.post("/register", (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    // body는 json 형식으로 데이터가 들어온다-> bodyparser의 역할
    const user = new User(req.body)
    //userInfo : 저장된 유저 정보 가짐
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err }) // error발생 시 json 형식으로 sucess:false 전달 후 err 메서지도 전달.
        return res.status(200).json({ success: true }) // status(200)은 성공했다는 뜻, http 200
    }) // 정보들이 user모델에 저장이 된다.
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
