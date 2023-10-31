import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export default createSlice({
    name: 'auth',
    initialState: {
        id: 10,
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTg3MjkwNDAsImV4cCI6MTcwMTMyMTA0MH0.-UmuStd8pG5fumNgXQfGNKUbkRbua80Ab0TJJ51KaLc",
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