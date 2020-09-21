import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import "antd/dist/antd.css"
import { applyMiddleware, createStore } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import Reducer from "./_reducers"

// redux는 객체만 받기 때문에 promise와 func 받도록 한다.
const createStorewithMiddleare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    <Provider
        store={createStorewithMiddleare(
            Reducer,
            // chrome Redux Extension connect
            window.__REDUX_DEVTOOLS_EXTESION__ && window.__REDUX_DEVTOOLS_EXTESION__()
        )}
    >
        <App />
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
