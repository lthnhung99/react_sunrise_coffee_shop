const initialState = {
    products: [],
    tableOrders: []
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PRODUCT_LIST":
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case "TABLE_ORDER_LIST":
            return {
                ...state,
                tableOrders: [...state.tableOrders, action.payload]
            }
        default:
            return state
    }
}

export default myReducer;

export const getAllProduct = (product) => {
    return {
        type: "PRODUCT_LIST",
        payload: product
    };
};

export const getAllTableOrder = (table) => {
    return {
        type: "TABLE_ORDER_LIST",
        payload: table
    }
}