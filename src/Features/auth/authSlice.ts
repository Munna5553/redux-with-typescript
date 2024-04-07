import { createSlice } from "@reduxjs/toolkit";
import { Login, registerUser } from "./authActions";
import { RootState } from "../../Store/Store";
import { InitialState } from "../types";

const initialState: InitialState = {
    loading: false,
    userInfo: {
        profile_info: {
            fullname: "",
            email: "",
            password: "",
            bio: "",
            avatar: "",
        },
        social_Links: {
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            github: "",
            website: ""
        },
        account_info: {
            posts: 0,
            reads: 0
        },
        _id: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    },
    userToken: {
        accessToken: "",
        refreshToken: ""
    },
    error: null,
    success: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Logout: (state) => {
            return {
                ...state,
                error: null,
                loading: false,
                success: false,
                userInfo: {
                    profile_info: {
                        fullname: "",
                        email: "",
                        password: "",
                        bio: "",
                        avatar: "",
                    },
                    social_Links: {
                        youtube: "",
                        instagram: "",
                        facebook: "",
                        twitter: "",
                        github: "",
                        website: ""
                    },
                    account_info: {
                        posts: 0,
                        reads: 0
                    },
                    _id: "",
                    createdAt: "",
                    updatedAt: "",
                    __v: 0
                },
                userToken: {
                    accessToken: "",
                    refreshToken: ""
                }
            };
        }
    },
    extraReducers: (builder) => {
        //extraReducer to register user
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                if (payload.success) {
                    const { profile_info, account_info, __v, _id, createdAt, social_Links, updatedAt } = payload.data.user;

                    state.userInfo = {
                        profile_info,
                        social_Links,
                        account_info,
                        _id,
                        createdAt,
                        updatedAt,
                        __v
                    }
                    state.userToken = {
                        accessToken: payload.data.accessToken,
                        refreshToken: payload.data.refreshToken,
                    }
                }
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.success = false;
                state.error = Error(payload?.message)
            })

        //extraReducer to Login user
        builder
            .addCase(Login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false
            })
            .addCase(Login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                if (payload.success) {
                    const { __v, _id, account_info, createdAt, profile_info, social_Links, updatedAt } = payload.data.user;

                    state.userInfo = {
                        _id,
                        __v,
                        profile_info,
                        account_info,
                        social_Links,
                        createdAt,
                        updatedAt
                    }

                    state.userToken = {
                        accessToken: payload.data.accessToken,
                        refreshToken: payload.data.refreshToken,
                    }

                    localStorage.setItem('userToken', payload.data.accessToken);
                    localStorage.setItem('refreshToken', payload.data.refreshToken);
                }
            })
    }
});


export const userSelector = (state: RootState) => state.auth;
export const authReducers = authSlice.reducer;
export const { Logout } = authSlice.actions;