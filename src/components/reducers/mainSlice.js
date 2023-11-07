import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import API_URL from "../constURL/URLMain";
import API_URL_ORDER from "../constURL/URLOrder";
import API_URL_BILL from "../constURL/URLBill";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraG9hM0BnbWFpbC5jb20iLCJpYXQiOjE2OTg5ODAyMjksImV4cCI6MTcwMTU3MjIyOX0.TRdTaaZX_2W5hBXHuU7Tgh1lW2b-YA8_00ynhLgp7Vg";
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

export const getAllTableOrder = createAsyncThunk(
    'main/getAllTableOrder',
    async () => {
        try {
            const response = await axios.get(API_URL + `tableOrders/all`);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);

export const changeAllProductToNewTable = createAsyncThunk(
    'main/changeAllProductToNewTable',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + `tableOrders/change-table`, data, { headers });
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const combineTables = createAsyncThunk(
    'main/combineTables',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL + `tableOrders/combine-tables`, data, { headers });
            return response.data;
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
            const response = await axios.get(API_URL_ORDER + `list-order-details/${data}`, { headers });
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
            const response = await axios.post(API_URL_ORDER + `create`, data, { headers });
            console.log(response.data);
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
            const response = await axios.patch(API_URL_ORDER + `update`, data, { headers });
            console.log(response.data);
            return response.data.products;
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
            await axios.delete(API_URL_ORDER + `delete/${orderItemId}`, { headers });
            return { orderItemId };
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const changeStatusCooking = createAsyncThunk(
    'main/changeStatusCooking',
    async (tableId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_ORDER + `change-status-cooking`, tableId, { headers });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const createBill = createAsyncThunk(
    'main/createBill',
    async (tableId, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_BILL + `?tableId=${tableId}`, { headers });
            return response;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

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
                note: '',
                tookNote: ''
            },
            tab: 'table',
            tableSelected: '',
            menu: {
                category: '',
            },
        },
        data: {
            tables: [],
            allTables: [],
            products: [],
            order: {
                customerId: '',
                phoneNumber: '',
                orderItems: [],
                tableOrderTitle: ''
            },
            listOrderWaiting: []
        },
        loading: false,
        error: '',
        loadingOrder: false

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
        setQuantityItem: (state, action) => {
            state.data.order.orderItems = action.payload;
        },
        setNote: (state, action) => {
            state.filters.products.note = action.payload;
        },
        setTookNote: (state, action) => {
            state.filters.products.tookNote = action.payload;
        },
        setListOrderDetail: (state, action) => {
            state.data.listOrderWaiting = action.payload;
        }
    },
    extraReducers:
        (builder) => {
            builder //show product
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
            builder //show table
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
            builder //change table
                .addCase(getAllTableOrder.fulfilled, (state, action) => {
                    state.data.allTables = action.payload;
                })
                .addCase(changeAllProductToNewTable.fulfilled, (state, action) => {
                    state.data.allTables = action.payload;
                })
                .addCase(combineTables.fulfilled, (state, action) => {

                })
            builder //show listOrder
                .addCase(getListOrderDetailByTableId.pending, (state, action) => {
                    state.loadingOrder = true;
                })
                .addCase(getListOrderDetailByTableId.fulfilled, (state, action) => {
                    state.data.order.orderItems = action.payload.data;
                    state.loadingOrder = false;
                })
                .addCase(getListOrderDetailByTableId.rejected, (state, action) => {
                    state.loadingOrder = false;
                })
            builder
                .addCase(createOrder.pending, (state, action) => {
                    state.loadingOrder = true;
                })
                .addCase(createOrder.fulfilled, (state, action) => {
                    const newOrder = action.payload.order;
                    state.data.order.orderItems = [...state.data.order.orderItems, newOrder];
                    state.loadingOrder = false;
                })
                .addCase(createOrder.rejected, (state, action) => {
                    state.loadingOrder = false;
                    state.error = action.payload.error;
                })
            builder
                .addCase(updateOrder.pending, (state, action) => {
                    state.loadingOrder = true;
                })
                .addCase(updateOrder.fulfilled, (state, action) => {
                    state.data.order.orderItems = action.payload;
                    state.loadingOrder = false;
                })
                .addCase(updateOrder.rejected, (state, action) => {
                    state.loadingOrder = false;
                    state.error = action.payload.error;
                })
            builder
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
            builder
                .addCase(changeStatusCooking.pending, (state, action) => {
                    state.loadingOrder = true;
                })
                .addCase(changeStatusCooking.fulfilled, (state, action) => {
                    state.data.order.orderItems = action.payload;
                    state.loadingOrder = false;
                })
                .addCase(changeStatusCooking.rejected, (state, action) => {
                    state.loadingOrder = false;
                    state.error = action.payload.error;
                })
            builder
                .addCase(createBill.fulfilled, (state, action) => {
                    state.data.order.orderItems = [];
                })
                .addCase(createBill.rejected, (state, action) => {
                })
        },
});
