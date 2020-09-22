// // user reducer 생성
// reducer은 previousState(이전 state) action(현재것)을 nextState로 만들어준다.

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types"

export default function (state = {}, action) {
    // type이 많아질테니 type별로 다른 작업을 하도록 switch문법 사용
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login: action.payload } // ...state : 받은 값 그대로 사용한다

        case REGISTER_USER:
            return { ...state, register: action.payload }

        case AUTH_USER:
            return { ...state, userData: action.payload }

        default:
            return state
    }
}
