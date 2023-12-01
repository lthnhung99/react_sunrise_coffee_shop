import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import API_URL_ORDER from "../../constant/constURL/URLOrder";
import API_URL_BILL from "../../constant/constURL/URLBill";
import API_URL_LOGIN from "../../constant/constURL/URLLogin";
import API_URL_PRODUCT from "../../constant/constURL/URLProduct";
import API_URL_TABLE from "../../constant/constURL/URLTable";
import API_URL_CATEGORY from "../../constant/constURL/URLCategory";
import { URL_BASE } from "../../constant/AppConstant";

export let instance = {};
const jwt = localStorage.getItem('jwt');
if (jwt) {
    instance = axios.create({
        baseURL: URL_BASE,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json',
        },
    });
}

export const auth = createAsyncThunk(
    'main/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL_LOGIN, data);
            localStorage.setItem('jwt', response.data.token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('roles', response.data.roles[0].authority);
            localStorage.setItem('avatar', response.data.staffAvatar.fileUrl);
            instance = axios.create({
                baseURL: URL_BASE,
                headers: {
                    'Authorization': response.data.token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: error.response.data });
        }
    }
);

export const loadProduct = createAsyncThunk(
    'main/loadProduct',
    async (data, { rejectWithValue }) => {
        try {
            let url = API_URL_PRODUCT + `?page=${data.page}&size=${data.size}&search=${data.search}`;
            if (data.category) {
                url += `&category=${data.category}`
            }
            const response = await instance.get(url);
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

export const getAllProducts = createAsyncThunk(
    'main/getAllProducts',
    async () => {
        try {
            const response = await instance.get(API_URL_PRODUCT + `/all`);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);

export const loadCategory = createAsyncThunk(
    'main/loadCategory',
    async () => {
        try {
            const response = await instance.get(API_URL_CATEGORY);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
        }
    }
);

export const loadTableOrder = createAsyncThunk(
    'main/loadTableOrder',
    async (data, { rejectWithValue }) => {
        try {
            let url = API_URL_TABLE + `?page=${data.page}&size=${data.size}&search=${data.search}`
            if (data.status) {
                url += `&status=${data.status}`;
            }
            if (data.zone) {
                url += `&zone=${data.zone?.split(' ')[1]}`;
            }
            const response = await instance.get(url);
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
            const response = await axios.get(API_URL_TABLE + `/all`);
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
            const response = await instance.post(API_URL_TABLE + `/change-table`, data);
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
            const response = await instance.post(API_URL_TABLE + `/combine-tables`, data);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const combineProducts = createAsyncThunk(
    'main/combineProducts',
    async (data, { rejectWithValue }) => {
        try {
            const response = await instance.post(API_URL_TABLE + `/combine-products`, data);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
);

export const splitProduct = createAsyncThunk(
    'main/splitProduct',
    async (data, { rejectWithValue }) => {
        try {
            const response = await instance.post(API_URL_TABLE + `/split-products`, data);
            return response.data;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            return rejectWithValue({ error: error.message });
        }
    }
)

export const getListOrderDetailByTableId = createAsyncThunk(
    'main/getListOrderDetailByTableId',
    async (data, { rejectWithValue }) => {
        try {
            const response = await instance.get(API_URL_ORDER + `list-order-details/${data}`);
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
            const response = await instance.post(API_URL_ORDER + `create`, data);
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
            const response = await instance.patch(API_URL_ORDER + `update`, data);
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
            await instance.delete(API_URL_ORDER + `delete/${orderItemId}`);
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
            const response = await instance.post(API_URL_ORDER + `change-status-cooking`, tableId);
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
            const response = await instance.post(API_URL_BILL + `?tableId=${tableId}`);
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
        counts: {
            countBusy: 0,
            countEmpty: 0,
            countTotal: 0,
        },
        filters: {
            search: '',
            tableOrders: {
                floor: '',
                title: '',
                status: '',
                page: 0,
                size: 12,
                totalPages: 0
            },
            products: {
                page: 0,
                size: 8,
                totalPages: 0,
                quantity: 1,
                note: '',
            },
            tab: 'table',
            tableSelected: '',
            floorSelected: ''
        },
        auth: {
            id: '',
            token: "",
            type: "",
            username: "",
            name: "",
            roles:
            {
                authority: ""
            },
            staffAvatar: ""
        },
        data: {
            tables: [],
            allTables: [],
            products: [],
            allProducts: [],
            categories: [],
            order: {
                orderItems: [],
                tableOrderTitle: '',
                createdAt: ''
            },
            listOrderWaiting: []
        },
        loading: false,
        error: '',
        loadingOrder: false,
        isLogin: true

    },
    reducers: {
        tabChanged: (state, action) => {
            state.filters.tab = action.payload;     // table or product
        },
        logout: (state) => {
            state.auth.id = '';
            state.auth.token = '';
            state.auth.type = '';
            state.auth.username = '';
            state.auth.name = '';
            state.auth.roles.authority = '';
            state.auth.staffAvatar = '';
        },
        setTableSelected: (state, action) => {
            state.filters.tableSelected = action.payload;
        },
        setTableTitle: (state, action) => {
            state.filters.tableOrders.title = action.payload;
        },
        setZoneTitle: (state, action) => {
            state.filters.floorSelected = action.payload;
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
        setListOrderDetail: (state, action) => {
            state.data.listOrderWaiting = action.payload;
        },
        setCounts: (state, action) => {
            state.counts = action.payload;
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(auth.pending, (state, action) => {
                    state.isLogin = false;
                })
                .addCase(auth.fulfilled, (state, action) => {
                    state.error = '';
                    state.auth.id = action.payload.id;
                    state.auth.token = action.payload.token;
                    state.auth.type = action.payload.type;
                    state.auth.username = action.payload.username;
                    state.auth.name = action.payload.name;
                    state.auth.roles.authority = action.payload.roles[0].authority;
                    state.auth.staffAvatar = action.payload.staffAvatar.fileUrl;
                    state.isLogin = true;
                })
                .addCase(auth.rejected, (state, action) => {
                    state.error = action.payload.error;
                    state.isLogin = true;
                })
            builder //show product
                .addCase(loadProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loadProduct.fulfilled, (state, action) => {
                    if (action.payload != null && action.payload.data !== "") {
                        state.data.products = action.payload.data.content;
                        state.filters.products.totalPages = action.payload.data.totalPages;
                    } else {
                        state.data.products = [];
                    }
                    state.filters.search = action.payload.request.search;
                    state.filters.products.size = action.payload.request.size;
                    state.filters.products.page = action.payload.request.page;
                    state.loading = false;
                })
                .addCase(loadProduct.rejected, (state, action) => {
                    state.data.products = [];
                    state.loading = false;
                    state.filters.products.totalPages = action.meta.arg.totalPages;
                    state.filters.search = action.meta.arg.search;
                    state.filters.products.page = action.meta.arg.page;
                    state.filters.products.size = action.meta.arg.size;
                })
                .addCase(getAllProducts.fulfilled, (state, action) => {
                    state.data.allProducts = action.payload;
                })
            builder
                .addCase(loadCategory.fulfilled, (state, action) => {
                    state.data.categories = action.payload;
                })
            builder //show table
                .addCase(loadTableOrder.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loadTableOrder.fulfilled, (state, action) => {
                    if (action.payload != null && action.payload.data !== "") {
                        state.data.tables = action.payload.data.content;
                        state.filters.tableOrders.totalPages = action.payload.data.totalPages;
                    } else {
                        state.data.tables = [];
                    }
                    state.filters.search = action.payload.request.search;
                    state.filters.tableOrders.floor = action.payload.request.zone;
                    state.filters.tableOrders.status = action.payload.request.status;
                    state.filters.tableOrders.size = action.payload.request.size;
                    state.filters.tableOrders.page = action.payload.request.page;
                    state.loading = false;
                })
                .addCase(loadTableOrder.rejected, (state, action) => {
                    state.data.tables = [];
                    state.loading = false;
                    state.filters.tableOrders.totalPages = action.meta.arg.totalPages;
                    state.filters.search = action.meta.arg.search;
                    state.filters.tableOrders.floor = action.meta.arg.zone;
                    state.filters.tableOrders.status = action.meta.arg.status;
                    state.filters.tableOrders.page = action.meta.arg.page;
                    state.filters.tableOrders.size = action.meta.arg.size;
                    state.counts.countBusy = 0;
                    state.counts.countEmpty = 0;
                    state.counts.countTotal = 0;
                })
            builder //change table
                .addCase(getAllTableOrder.fulfilled, (state, action) => {
                    state.data.allTables = action.payload;
                })
                .addCase(getAllTableOrder.rejected, (state, action) => {
                })
                .addCase(changeAllProductToNewTable.fulfilled, (state, action) => {
                    state.data.allTables = action.payload;
                })
                .addCase(combineTables.fulfilled, (state, action) => {

                })
                .addCase(combineProducts.fulfilled, (state, action) => {

                })
                .addCase(splitProduct.fulfilled, (state, action) => {

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
                    state.data.order.createdAt = action.payload.order.createdAt;
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
                    state.loadingOrder = true;
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
                    state.loadingOrder = false;
                })
                .addCase(deleteOrderItem.rejected, (state, action) => {
                    state.loadingOrder = false;
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
                .addCase(createBill.pending, (state) => {
                    state.loadingOrder = true;
                })
                .addCase(createBill.fulfilled, (state, action) => {
                    state.loadingOrder = false;
                    state.data.order.orderItems = [];
                })
                .addCase(createBill.rejected, (state, action) => {
                    state.loadingOrder = false;
                })
        },
});
