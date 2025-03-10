import { postLogin } from "../api/accountApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { Cookies } = require("react-cookie");

const cookies = new Cookies();

export const postLoginAsyncThunk = createAsyncThunk("postLoginAsyncThunk", (param) => {
    return postLogin(param)
})

const loginSlice = createSlice({
    name: "loginSlice",
    initialState: {
        isAuthenticated: false,
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            cookies.remove("JSESSIONID");
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLoginAsyncThunk.pending, (state, action) => {

            })
            .addCase(postLoginAsyncThunk.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(postLoginAsyncThunk.rejected, (state, action) => {

            })
    }
})

export const { logout, setUser } = loginSlice.actions;

export default loginSlice.reducer;