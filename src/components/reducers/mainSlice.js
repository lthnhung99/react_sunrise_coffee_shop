import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const loadProduct = createAsyncThunk(
    'main/loadProduct',
    async (data, { rejectWithValue }) => {
        try {
            console.log("Search API", data);
            const response = await axios.get(`http://localhost:9000/api/products?page=${data.page}&size=${data.size}&search=${data.search}`);

            console.log("response", response);
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

export default createSlice({
    name: 'main',
    initialState: {
        filters: {
            search: '',
            page: 0,
            size: 4,
            totalPages: 0,
            table: {
                floor: '',
                status: ''
            },
            tableSelected: '',
            menu: {
                category: '',
            }
        },
        data: {
            tables: [],
            products: [],
            orderItems: [],
        },
        loading: false,
        error: ''

    },
    reducers: {

    },
    extraReducers:
        (builder) => {
            builder
                .addCase(loadProduct.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loadProduct.fulfilled, (state, action) => {
                    if (action.payload != null && action.payload.data != "") {
                        state.data.products = action.payload.data.content;
                        state.filters.totalPages = action.payload.data.totalPages;
                    } else {
                        state.data.products = [];
                    }
                    state.loading = false;
                    state.filters.search = action.payload.request.search;
                    state.filters.size = action.payload.request.size;
                    state.filters.page = action.payload.request.page;
                })
                .addCase(loadProduct.rejected, (state, action) => {
                    state.data.products = [];
                    state.filters.totalPages = 0;
                    state.loading = true;
                    state.filters.search = '';
                    state.filters.page = '';
                    state.filters.size = 4
                })

        },
});