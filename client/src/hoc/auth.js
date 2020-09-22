import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "../_actions/user_action"

// specificComponent : Route에 설정한 컴포넌트.
// option : null -> 아무나 출입이 가능한 페이지, true -> 로그인한 유저만 출입 가능, false -> 로그인 한 유저는 출입 불가능
// adminRoute : true -> admin유저만 출입이 가능
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        //backend에 request를 넘겨서 접속한 사람의 상태를 받아야한다.
        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response)

                // 분기처리.
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    // option이 true인 페이지, 즉 로그인하지 않은 사람이 로그인 한 유저만 출입이 가능한 페이지로 이동하려고 하는경우 home으로
                    if (option) {
                        props.history.push("/")
                    }
                } else {
                    // 로그인 한 상태
                    // isAdmin이 false즉 관리자가 아닌데 어드민만 들어갈 수 있는 페이지 들어가려고 하는 경우
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/"')
                    } else {
                        // 로그인한 유저가 출입 불가능한 페이지를 들어가려고 할 때
                        if (option === false) {
                            props.history.push("/")
                        }
                    }
                }
            })
        }, [])

        return <SpecificComponent />
    }
    return AuthenticationCheck
}
