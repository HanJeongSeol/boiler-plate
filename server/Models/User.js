const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

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

// 몽구스에서 가져온 메소드. index에서 const user = new User(req.body)를 하기 이전에 수행
// next인자값은 위 동작을 완료한 후 index로 보내준다.
userSchema.pre("save", function (next) {
    // this = UserSchema
    var user = this

    // 암호가 변경될 때만 암호화를 수행
    if (user.isModified("password")) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err)
            }
            // hash(기존 비밀번호, salt, func(err, 암호화된 pwd))
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                // 암호화가 성공했다면 모델에 저장된 비밀번호를 암호화된 비밀번호로 변경
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword 1234567, 암호화된 pwd $12312332483249234928
    // 두 암호가 같은지 확인해야한다. plainpwd를 암호화해서 db의 암호화된 값과 같은지 체크
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this
    // jsonwewbtoken을 사용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), "secret")

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this

    // 토큰을 decode하는 과정
    jwt.verify(token, "secret", function (err, decoded) {
        // 유저 아이디로 유저를 찾은 후 클라이언트에서 가져온 token과
        // db에 보관된 토큰이 일치하는지 확인

        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

// Schema를 model로 감싸야한다.
const User = mongoose.model("User", userSchema)

// 다른 곳에서 사용할 수 있게 exports
module.exports = { User }
