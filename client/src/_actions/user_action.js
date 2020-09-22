import axios from "axios"
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"
// dataTosubmit를 통해서 dispatch(loginUser(body)) body를 받아옴
export function loginUser(dataTosubmit) {
    // 1. 서버에 request를 날림
    const request = axios
        .post("/api/users/login", dataTosubmit)
        // 2. response받은거에 data를 넣어서 request에 저장
        .then((response) => response.data)

    // reducer에 넘겨줘야한다.
    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post("/api/users/register", dataTosubmit).then((response) => response.data)

    return {
        type: REGISTER_USER,
        payload: request,
    }
}

export function auth() {
    const request = axios.get("/api/users/auth").then((response) => response.data)

    return {
        type: AUTH_USER,
        payload: request,
    }
}
