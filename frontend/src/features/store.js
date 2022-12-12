import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { reducers } from "./reducers";

const middleware = [thunk]

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export const store = createStore(reducers, enhancer)