import React, { useEffect } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"
// import { response } from "express"

const LandingPage = (props) => {
    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response))
    }, [])

    // redux는 state 관리르 편하게 하기 위해서 사용하는거임
    // 로그아웃 기능은 state변화 대신 db에 존재하는 token만 삭제하면 되기 때문에
    // 많은 작업이 필요한 redux를 사용할 필요가 없다.
    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.success) {
                props.history.push("/login")
            } else {
                alert("로그아웃이 실패했습니다.")
            }
        })
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
            <h2>시작페이지</h2>

            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage)
