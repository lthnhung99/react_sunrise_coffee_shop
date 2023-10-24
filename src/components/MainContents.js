/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from "@mui/material";
import MenuOrder from './bodyLeft/MenuOrder';
import ItemOrder from './bodyRight/ItemOrder';
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';
import MenuOrderContext from './MenuOrderContext';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct, loadTableOrder, createOrder, updateOrder, changeWaiting } from './reducers/mainSlice';
import { useLocation } from 'react-router-dom';
import mainSlice from './reducers/mainSlice';

const MainContents = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [previousSelectedProductId, setPreviousSelectedProductId] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const mainFilters = useSelector((state) => state.main.filters);
    const quantity = mainFilters.products.quantity;
    const note = mainFilters.products.note;

    const listOrderItem = useSelector(state => state.main.data.order.orderItems);

    if (location.pathname === "/") {
        dispatch(mainSlice.actions.tabChanged('table'));
    } else if (location.pathname === "/products") {
        dispatch(mainSlice.actions.tabChanged('product'));
    }

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(loadTableOrder({
                search: mainFilters.search,
                page: mainFilters.tableOrders.page,
                size: mainFilters.tableOrders.size,
                totalPages: mainFilters.tableOrders.totalPages,
            }));
        }
        if (location.pathname === '/products') {
            dispatch(loadProduct({
                search: mainFilters.search,
                page: mainFilters.products.page,
                size: mainFilters.products.size,
                totalPages: mainFilters.products.totalPages
            }));
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        const onProductSelect = async (productId) => {
            console.log("Selected product ID:", productId);
            try {
                const response = await fetch(`http://localhost:9000/api/products/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSelectedProduct(data);
                } else {
                    console.error("API request failed with status:", response.status);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        if (selectedProduct.id && selectedProduct.id !== previousSelectedProductId) {
            onProductSelect(selectedProduct.id);
            setPreviousSelectedProductId(selectedProduct.id);
        }
    }, [selectedProduct.id, previousSelectedProductId]);

    const handleAddProduct = (product) => {
        if (listOrderItem === "") {
            if (product && product.id) {
                dispatch(createOrder({
                    tableId: mainFilters.tableSelected,
                    productId: product.id,
                    quantity: quantity,
                    note: note
                }));
            }
        }
        else {
            if (product && product.id) {
                dispatch(updateOrder({
                    tableId: mainFilters.tableSelected,
                    productId: product.id,
                    quantity: quantity,
                    note: note,
                    status: "NEW"
                }));
            }
        }

    }

    const handleStatusChange = () => {
        dispatch(changeWaiting(mainFilters.tableSelected))
    }

    const menuOrderData = {
        selectedProduct,
        setSelectedProduct,
        handleAddProduct,
        listOrderItem,
        // setListOrderItem
    };
    return (
        <div>
            <MenuOrderContext.Provider value={menuOrderData}>
                <Box sx={{ backgroundColor: "darkBlue" }}
                    className="background-container"
                >
                    <Grid
                        container
                        className="custom-mui-grid-container"
                        spacing={2}
                        sx={{
                            width: "100%",
                            marginLeft: "-4px"
                        }}
                    >
                        <Grid item xs={6} md={7} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                            <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                                <Box style={{ backgroundColor: "white" }}>
                                    <MenuOrder />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={5} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                            <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                                <Box
                                    style={{
                                        backgroundColor: "white",
                                        height: "92%"
                                    }}
                                >
                                    <ItemOrder />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        height: "50px",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
                                        <Grid item xs={6}>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                startIcon={<MonetizationOn />}
                                                disableElevation
                                                style={{
                                                    backgroundColor: "green",
                                                    width: "100%",
                                                    margin: "5px",
                                                    borderRadius: "10px",
                                                    padding: "15px 0"
                                                }}
                                            >
                                                Thanh toán
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} sx={{ paddingRight: "16px" }}>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                startIcon={<CircleNotifications />}
                                                disableElevation
                                                style={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                    margin: "5px",
                                                    padding: "15px 0",
                                                    backgroundColor: (listOrderItem.length === 0 || listOrderItem.status === "NEW") ? "#69b1ff" : "#1677ff"
                                                }}
                                                disabled={listOrderItem.length === 0 || listOrderItem.status === "NEW"}
                                                onClick={handleStatusChange}
                                            >
                                                Thông báo
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        style={{
                            textAlign: "center",
                            justifyContent: "center",
                            color: "white",
                            padding: "0 0 10px 0",
                        }}
                        item
                    >
                        Hỗ trợ:19006522 | Chi nhánh trung tâm: Thừa Thiên Huế | NKL-2023
                    </Grid>
                </Box>
            </MenuOrderContext.Provider>
        </div>
    );
};

export default MainContents;