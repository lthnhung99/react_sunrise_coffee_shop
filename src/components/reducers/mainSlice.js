import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:9000/api/";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTgwNzY0NDIsImV4cCI6MTcwMDY2ODQ0Mn0.UBshzSZdtwHJINyKsTEyjEVGpBKeXhot3sEQXh0-IgI"
const headers = {
    Authorization: token,
    "Content-Type": "application/json"
};
export const loadProduct = createAsyncThunk(
    'main/loadProduct',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + `products?page=${data.page}&size=${data.size}&search=${data.search}`, { headers });
            return {
                request: data,
                data: response.data
            }
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const loadTableOrder = createAsyncThunk(
    'main/loadTableOrder',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + `tableOrders?page=${data.page}&size=${data.size}&search=${data.search}`);
            return {
                request: data,
                data: response.data
            }
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const getListOrderDetailByTableId = createAsyncThunk(
    'main/getListOrderDetailByTableId',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL + `orders/list-order-details/${data}`, { headers });
            return {
                request: data,
                data: response.data
            }
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
)

export const createOrder = createAsyncThunk(
    'main/createOrder',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + `orders/create`, data, { headers });
            return { order: response.data };
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
)

export const updateOrder = createAsyncThunk(
    'main/updateOrder',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.patch(API_URL + `orders/update`, data, { headers });
            return { order: response.data.products };
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
)

export const deleteOrderItem = createAsyncThunk(
    'main/deleteOrderItem',
    async (orderItemId, { rejectWithValue }) => {
        try {
            await axios.delete(API_URL + `orders/delete/${orderItemId}`, { headers });
            return { orderItemId };
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const changeWaiting = createAsyncThunk(
    'main/changeWaiting',
    async (tableId, { rejectWithValue }) => {
        try {
            console.log(tableId);
            const response = await axios.post(API_URL + `orders/change-status-waiting`, tableId, { headers });
            console.log(response);
            return response;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
)

export default createSlice({
    name: 'main',
    initialState: {
        filters: {
            search: '',
            tableOrders: {
                floor: '',
                title: '',
                status: '',
                page: 0,
                size: 12,
                totalPages: 0,
            },
            products: {
                page: 0,
                size: 8,
                totalPages: 0,
                quantity: 1,
                note: ''
            },
            tab: 'table',
            tableSelected: '',
            menu: {
                category: '',
            }
        },
        data: {
            tables: [],
            products: [],
            order: {
                customerId: '',
                phoneNumber: '',
                orderItems: [],
                tableOrderTitle: ''
            }

        },
        loading: false,
        error: ''

    },
    reducers: {
        tabChanged: (state, action) => {
            state.filters.tab = action.payload;     // table or product
        },
        setTableSelected: (state, action) => {
            state.filters.tableSelected = action.payload;
        },
        setTableTitle: (state, action) => {
            state.filters.tableOrders.title = action.payload;
        },
        setZoneTitle: (state, action) => {
            state.filters.tableOrders.floor = action.payload;
        },
        setQuantity: (state, action) => {
            state.filters.products.quantity = action.payload;
        },
        setNote: (state, action) => {
            state.filters.products.note = action.payload;
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(loadProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loadProduct.fulfilled, (state, action) => {
                    if (action.payload != null && action.payload.data !== "") {
                        state.data.products = action.payload.data.content;
                        state.filters.totalPages = action.payload.data.totalPages;
                    } else {
                        state.data.products = [];
                    }
                    state.filters.search = action.payload.request.search;
                    state.filters.size = action.payload.request.size;
                    state.filters.page = action.payload.request.page;
                    state.loading = false;
                })
                .addCase(loadProduct.rejected, (state, action) => {
                    state.data.products = [];
                    state.loading = false;
                    state.filters.totalPages = action.meta.arg.totalPages;
                    state.filters.search = action.meta.arg.search;
                    state.filters.page = action.meta.arg.page;
                    state.filters.size = action.meta.arg.size;
                })
                .addCase(loadTableOrder.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loadTableOrder.fulfilled, (state, action) => {
                    if (action.payload != null && action.payload.data !== "") {
                        state.data.tables = action.payload.data.content;
                        state.filters.totalPages = action.payload.data.totalPages;
                    } else {
                        state.data.tables = [];
                    }
                    state.filters.search = action.payload.request.search;
                    state.filters.size = action.payload.request.size;
                    state.filters.page = action.payload.request.page;
                    state.loading = false;
                })
                .addCase(loadTableOrder.rejected, (state, action) => {
                    state.data.tables = [];
                    state.loading = false;
                    state.filters.totalPages = action.meta.arg.totalPages;
                    state.filters.search = action.meta.arg.search;
                    state.filters.page = action.meta.arg.page;
                    state.filters.size = action.meta.arg.size;
                })
                .addCase(getListOrderDetailByTableId.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(getListOrderDetailByTableId.fulfilled, (state, action) => {
                    state.data.order.orderItems = action.payload.data;
                    state.loading = false;
                })
                .addCase(getListOrderDetailByTableId.rejected, (state, action) => {

                })
                // .addCase(createOrder.pending, (state, action) => {
                //     state.loading = true;
                // })
                .addCase(createOrder.fulfilled, (state, action) => {
                    const newOrder = action.payload.order;
                    state.data.order.orderItems = [...state.data.order.orderItems, newOrder];
                    state.loading = false;
                })
                .addCase(createOrder.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload.error;
                })
                // .addCase(updateOrder.pending, (state, action) => {
                //     state.loading = true;
                // })
                .addCase(updateOrder.fulfilled, (state, action) => {
                    const newOrder = action.payload.order;
                    state.data.order.orderItems = newOrder;
                    state.loading = false;
                })
                .addCase(updateOrder.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload.error;
                })
                .addCase(deleteOrderItem.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(deleteOrderItem.fulfilled, (state, action) => {
                    const orderItemId = action.payload.orderItemId;
                    const updatedOrderItems = state.data.order.orderItems.filter(
                        item => item.orderDetailId !== orderItemId
                    );

                    state.data.order = {
                        ...state.data.order,
                        orderItems: updatedOrderItems
                    };
                    state.loading = false;
                })
                .addCase(deleteOrderItem.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload.error;
                })
                .addCase(changeWaiting.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(changeWaiting.fulfilled, (state, action) => {
                    console.log(state);
                    console.log(action);
                    state.data.order.orderItems = action.payload.data.orderDetails;
                    state.loading = false;
                })
                .addCase(changeWaiting.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload.error;
                })
                ;
        },
});
