import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import API_URL_KITCHEN from "../constURL/URLKitchen";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTg3MjkwNDAsImV4cCI6MTcwMTMyMTA0MH0.-UmuStd8pG5fumNgXQfGNKUbkRbua80Ab0TJJ51KaLc"
const headers = {
    Authorization: token,
    "Content-Type": "application/json"
};

export const getAll = createAsyncThunk(
    'kitchen/getAll',
    async () => {
        try {
            const response = await axios.get(API_URL_KITCHEN + `get-all`, { headers });
            console.log(response.data.itemsCooking);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);

export const changeStatusFromCookingToWaiterOfProduct = createAsyncThunk(
    'kitchen/changeStatusFromCookingToWaiterOfProduct',
    async (orderDetailId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `table/change-status-cooking-to-waiting?orderDetailId=${orderDetailId}`, { headers });
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export default createSlice({
    name: 'kitchen',
    initialState: {
        listOrderItem: [],
        orderItemsSupply: [],
        orderItemsWaiting: [],
        loading: false,
        error: ''

    },
    reducers: {

    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getAll.fulfilled, (state, action) => {
                    state.listOrderItem = action.payload.itemsCooking;
                    state.orderItemsWaiting = action.payload.itemsWaiter;
                })
                .addCase(changeStatusFromCookingToWaiterOfProduct.fulfilled, (state, action) => {
                    // state.orderItemsWaiting = [...state.orderItemsWaiting, action.payload];
                })
                .addCase(changeStatusFromCookingToWaiterOfProduct.rejected, (state, action) => {
                })
        }
});
