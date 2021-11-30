import * as reducers from "./reducers";
import {configureStore, combineReducers} from "@reduxjs/toolkit";


const rootReducer = combineReducers(reducers);

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = configureStore({
//     reducer: {
//
//     }
// })

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    },)
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];