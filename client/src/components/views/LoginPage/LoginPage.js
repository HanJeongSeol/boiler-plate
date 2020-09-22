/*
    test : dkfzpdls@naver.com
    testpwd : 12345


    tmfbm@naver.com
    123456
*/

import React, { useState } from "react"
import { useDispatch } from "react-redux" // redux 사용하여 state관리
import { loginUser } from "../../../_actions/user_action"
import { withRouter } from "react-router-dom"

const LoginPage = (props) => {
    // function LoginPage(props){
    const dispatch = useDispatch()

    // hook state, default = space
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // email form에 기입할 수 있도록 만들어준다.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // preventDefault()를 사용해서 버튼을 클릭했을 때 새로고침되지 않도록 한다.
        event.preventDefault()

        console.log("Email", Email)
        console.log("Password", Password)

        let body = {
            email: Email,
            password: Password,
        }
        // dispatch를 사용, action이름은 loginUser, _action 폴더에 정의
        dispatch(loginUser(body)).then((response) => {
            // payload : server에서 status(200)과 함께 json 형식으로 넘어오는 데이터를 저장
            if (response.payload.loginSuccess) {
                console.log(response.payload)
                props.history.push("/")
            } else {
                alert("Error")
            }
        })

        // redux사용으로 인하여 _actions폴더로 이동
        // Axios.post("/api/users/login", body).then((response) => {})
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
