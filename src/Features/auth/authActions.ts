import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginProps, registerProps, response } from "../types";


const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const registerUser = createAsyncThunk<response, registerProps, { rejectValue: SerializedError }>(
    "auth/register",
    async (values, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<response>("http://localhost:4000/api/auth/register", values, config);

            console.log(data);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
            return rejectWithValue({ message: 'An error occurred while registering the user.' });
        }
    }
);

export const Login = createAsyncThunk<response, LoginProps, { rejectValue: SerializedError }>(
    "auth/login",
    async (values, { rejectWithValue }) => {
        try {

            const { data } = await axios.post<response>("http://localhost:4000/api/auth/login", values, config);

            console.log(data);
            return data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.message) {
                    return rejectWithValue({ message: error.response.data.message });
                }
            }
            return rejectWithValue({ message: 'An error occurred while logging in.' });
        }
    }
);