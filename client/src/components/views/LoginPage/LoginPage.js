import React, { useState } from "react"

const LoginPage = () => {
    // hook state, default = space
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // email form에 기입할 수 있도록 만들어준다.
    const onEmailHander = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHander = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHander = (event) => {
        // preventDefault()를 사용해서 버튼을 클릭했을 때 새로고침되지 않도록 한다.
        event.preventDefault()

        console.log("Email", Email)
        console.log("Password", Password)
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHander}>
                <label>Email</label>
                {/* 타이핑 할 때 onchange를 사용해서 stat를 변경 */}
                <input type="email" value={Email} onChange={onEmailHander} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHander} />
                <br />
                <button onChange={onSubmitHander}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
