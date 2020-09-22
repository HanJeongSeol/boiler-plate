import React, { useState } from "react"
import { useDispatch } from "react-redux" // redux 사용하여 state관리
import { registerUser } from "../../../_actions/user_action"
import { withRouter } from "react-router-dom"

const RegisterPage = (props) => {
    // function LoginPage(props){
    const dispatch = useDispatch()

    // hook state, default = space
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [Name, setName] = useState("")

    // email form에 기입할 수 있도록 만들어준다.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // preventDefault()를 사용해서 버튼을 클릭했을 때 새로고침되지 않도록 한다.
        event.preventDefault()

        if (Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }
        let body = {
            email: Email,
            password: Password,
            name: Name,
        }
        // dispatch를 사용, action이름은 loginUser, _action 폴더에 정의
        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                props.history.push("/login")
            } else {
                alert("Fail")
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
