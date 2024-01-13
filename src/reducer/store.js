import { configureStore } from "@reduxjs/toolkit";
import { weaterReducer } from "./weatherToolkit";

export const store = configureStore({
    reducer: {
        weaterReducer
    }
})
