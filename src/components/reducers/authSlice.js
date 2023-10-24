import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export default createSlice({
    name: 'auth',
    initialState: {
        id: 10,
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTgxMTEwMzIsImV4cCI6MTcwMDcwMzAzMn0.uqZFiGe5KvZ-uRMM95htUDk9ooqXk2tVERi1v0VCdME",
        type: "Bearer",
        username: "khoa3@gmail.com",
        name: "khoa3@gmail.com",
        roles: [
            {
                "authority": "STAFF_ORDER"
            }
        ],
        loading: false,
        error: ''

    },
    reducers: {

    },
    extraReducers:
        (builder) => {

        },
});