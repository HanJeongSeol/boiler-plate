const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },

    email: {
        type: String,
        trim: true, // space를 없애주는 역할
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number, // 관리자 :1, 유저 : 0
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    // 토큰의 유효기간
    tokenExp: {
        type: Number,
    },
})

// Schema를 model로 감싸야한다.
const User = mongoose.model("User", userSchema)

// 다른 곳에서 사용할 수 있게 exports
module.exports = { User }
