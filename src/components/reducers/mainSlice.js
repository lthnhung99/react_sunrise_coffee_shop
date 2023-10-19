import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const loadProduct = createAsyncThunk(
    'main/loadProduct',
    async (data, { rejectWithValue }) => {
        try {
            console.log("Search API", data);
            const response = await axios.get(`http://localhost:9000/api/products?page=${data.page}&size=${data.size}&search=${data.search}`);
            return {
                request: data,
                data: response.data.content
            }
            return response.data.content;
        } catch (error) {
            console.log("Loading Todo  API error: " + error);
            // return rejectWithValue({ error: error.message });
            return {
                request: data,
                data: []
            };
        }
    }
);

export default createSlice({
    name: 'main',
    initialState: {
        filters: {
            search: '',
            page: 0,
            size: 10,
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
                    state.data.products = action.payload.data;
                    state.loading = false;
                    state.filters.search = action.payload.request.search;
                    state.filters.page = action.payload.request.page;
                    state.filters.size = action.payload.request.size;
                    return state;
                })

        },
});