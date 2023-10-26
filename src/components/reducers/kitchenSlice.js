import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



export default createSlice({
    name: 'kitchen',
    initialState: {
        orderItemsSupply: [],
        orderItemsWaiting: [],
        loading: false,
        error: ''

    },
    reducers: {

    },
    extraReducers:
        (builder) => {
        }
});
