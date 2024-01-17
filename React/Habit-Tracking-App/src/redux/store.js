import { configureStore } from "@reduxjs/toolkit"
import { homeReducer } from "./reducers/homeReducer"
import { headerReducer } from "./reducers/headerReducer"
import { calendarReducer } from "./reducers/calendarReducer"

export const store = configureStore({
    reducer: {
        homeReducer,
        headerReducer,
        calendarReducer
    }
})