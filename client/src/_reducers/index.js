// import { combineReducers } from "redux"
// import user from "./user_reducer"

// // import user from "./user_reducer"
// // import comment from "./comment_reducer"

// // combineReduxers : Store에 여러가지 reducer가 존재할 수 있다.
// // state가 변화한 후에 변화한 값을 리턴하는게 reducer.
// // state가 user, post 등등 여러가지 존재할 수 있기 때문에
// // combineReduxers를 사용해서 rootReducer에서 하나로 합쳐준다.
// // 우리는 login register를 만들기 때문에 user reducer를 생성한다.
// const rootReducer = combineReducers({
//     user,
//     // comment
// })

// export default rootReducer

import { combineReducers } from "redux"
import user from "./user_reducer"

const rootReducer = combineReducers({
    user,
})

export default rootReducer
