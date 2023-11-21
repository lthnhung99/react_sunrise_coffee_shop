import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import API_URL_KITCHEN from "../../constant/constURL/URLKitchen";

// const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTg5ODAyMjksImV4cCI6MTcwMTU3MjIyOX0.TRdTaaZX_2W5hBXHuU7Tgh1lW2b-YA8_00ynhLgp7Vg"
// const headers = {
//     Authorization: token,
//     "Content-Type": "application/json"
// };

export const getAll = createAsyncThunk(
    'kitchen/getAll',
    async () => {
        try {
            const response = await axios.get(API_URL_KITCHEN + `get-all`);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);

export const getAllOrderDetailByProduct = createAsyncThunk(
    'kitchen/getAllOrderDetailByProduct',
    async () => {
        try {
            const response = await axios.get(API_URL_KITCHEN + `get-by-status-cooking`);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);
//chuyển 1 món từ cooking sang waiting
export const changeStatusOneProductFromCookingToWaitingOfGroupProduct = createAsyncThunk(
    'kitchen/changeStatusOneProductFromCookingToWaitingOfGroupProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `product/change-status-cooking-to-waiting-one-product`, product);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);
//chuyển tất cả món từ cooking sang waiting
export const changeStatusAllProductFromCookingToWaitingOfGroupProduct = createAsyncThunk(
    'kitchen/changeStatusAllProductFromCookingToWaitingOfGroupProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `product/change-status-cooking-to-waiting-all-product`, product);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);
//chuyển 1 món từ waiting sang done
export const changeStatusFromWaitingToDoneOfProduct = createAsyncThunk(
    'kitchen/changeStatusFromWaitingToDoneOfProduct',
    async (orderDetailId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `product/change-status-waiting-to-done-one-product-of-table?orderDetailId=${orderDetailId}`);
            return response;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

//chuyển tất cả món từ waiting sang done
export const changeStatusFromWaitingToDoneAllProductOfOrder = createAsyncThunk(
    'kitchen/changeStatusFromWaitingToDoneAllProductOfOrder',
    async (orderDetailId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `table/change-status-waiting-to-done-all-product-of-table?orderDetailId=${orderDetailId}`);
            return response;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);
//chuyển món từ cooking sang stock out
export const changeStatusFromCookingToStockOutOfProduct = createAsyncThunk(
    'kitchen/changeStatusFromCookingToStockOutOfProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `product/change-status-cooking-to-stock-out-all-product`, product);
            return response;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);
//chuyển món từ waiting sang stock out
export const changeStatusFromWaitingToStockOutToProductOfOrder = createAsyncThunk(
    'kitchen/changeStatusFromWaitingToStockOutToProductOfOrder',
    async (orderDetailId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_KITCHEN + `table/change-status-waiting-to-stock-out-to-product?orderDetailId=${orderDetailId}`);
            return response;
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
                .addCase(getAll.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getAll.fulfilled, (state, action) => {
                    state.listOrderItem = action.payload.itemsCooking;
                    state.orderItemsWaiting = action.payload.itemsWaiter;
                    state.loading = false;
                })
                .addCase(getAll.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusOneProductFromCookingToWaitingOfGroupProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusOneProductFromCookingToWaitingOfGroupProduct.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusOneProductFromCookingToWaitingOfGroupProduct.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusAllProductFromCookingToWaitingOfGroupProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusAllProductFromCookingToWaitingOfGroupProduct.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusAllProductFromCookingToWaitingOfGroupProduct.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToDoneOfProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusFromWaitingToDoneOfProduct.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToDoneOfProduct.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToDoneAllProductOfOrder.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusFromWaitingToDoneAllProductOfOrder.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToDoneAllProductOfOrder.rejected, (state) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromCookingToStockOutOfProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusFromCookingToStockOutOfProduct.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromCookingToStockOutOfProduct.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToStockOutToProductOfOrder.pending, (state) => {
                    state.loading = true;
                })
                .addCase(changeStatusFromWaitingToStockOutToProductOfOrder.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(changeStatusFromWaitingToStockOutToProductOfOrder.rejected, (state, action) => {
                    state.loading = false;
                })
        }
});
