import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "../Features/auth/authSlice";

export const Store = configureStore({
    reducer: {
        auth: authReducers
    }
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>