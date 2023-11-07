import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export default createSlice({
    name: 'auth',
    initialState: {
        id: 10,
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTg5ODAyMjksImV4cCI6MTcwMTU3MjIyOX0.TRdTaaZX_2W5hBXHuU7Tgh1lW2b-YA8_00ynhLgp7Vg",
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