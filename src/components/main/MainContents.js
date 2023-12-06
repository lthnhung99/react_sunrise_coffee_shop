/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from "@mui/material";
import MenuOrder from '../bodyLeft/MenuOrder';
import ItemOrder from '../bodyRight/ItemOrder';
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';
import MenuOrderContext from './MenuOrderContext';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder, changeStatusCooking, getAllTableOrder, getAllCategory, getAllProducts } from '../reducers/mainSlice';
import { useLocation } from 'react-router-dom';
import mainSlice from '../reducers/mainSlice';
import { blue, purple } from '@mui/material/colors';
import API_URL_PRODUCT from '../../constant/constURL/URLProduct';
import Bill from '../pay/Bill';
import { NEW, STOCK_OUT, BARISTA } from '../../constant/AppConstant';
import { ToastifySuccess, ToastifyWarning } from '../toastify/Toastify';

const MainContents = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [previousSelectedProductId, setPreviousSelectedProductId] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const mainFilters = useSelector((state) => state.main.filters);
    const [openBill, setOpenBill] = useState(false);
    const listOrderItem = useSelector(state => state.main.data.order.orderItems || []);
    const billItems = listOrderItem.filter((item) => item.status !== STOCK_OUT);
    const isLoading = useSelector(state => state.main.loadingOrder);

    useEffect(() => {
        dispatch(getAllTableOrder());
    }, []);

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const handleOpenModal = () => {
        const hasNewItem = listOrderItem.some((item) => item.status === NEW);
        const allStockOut = listOrderItem.every((item) => item.status === STOCK_OUT);

        if (hasNewItem) {
            ToastifyWarning("Có sản phẩm chưa được gửi tới bếp!");
        } else if (allStockOut) {
            ToastifyWarning("Không có sản phẩm để thanh toán!");
        } else {
            setOpenBill(true);
        }
    };

    const handleCloseModal = () => {
        setOpenBill(false);
    };

    if (location.pathname === "/") {
        dispatch(mainSlice.actions.tabChanged('table'));
    } else if (location.pathname === "/products") {
        dispatch(mainSlice.actions.tabChanged('product'));
    }

    useEffect(() => {
        const onProductSelect = async (productId) => {
            console.log("Selected product ID:", productId);
            try {
                const response = await fetch(API_URL_PRODUCT + `/${productId}`);
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
        if (localStorage.getItem('roles') === BARISTA) {
            ToastifyWarning('Bạn không có quyền order!')
        } else {
            if (listOrderItem.length === 0) {
                if (product && product.id) {
                    dispatch(createOrder({
                        tableId: mainFilters.tableSelected,
                        productId: product.id,
                        quantity: product.quantity,
                        note: product.note
                    }));
                }
            }
            else {
                if (product && product.id) {
                    dispatch(updateOrder({
                        tableId: mainFilters.tableSelected,
                        productId: product.id,
                        quantity: product.quantity,
                        note: product.note,
                        status: NEW
                    }));
                }
            }
        }
    };

    const handleStatusChange = () => {
        dispatch(changeStatusCooking(mainFilters.tableSelected))
            .then(() => {
                ToastifySuccess('Gửi bếp/bar thành công!');
            });
    };

    const menuOrderData = {
        selectedProduct,
        setSelectedProduct,
        handleAddProduct,
        listOrderItem,
        billItems
    };

    return (
        <MenuOrderContext.Provider value={menuOrderData}>
            <Box sx={{ backgroundColor: purple[500], height: "100%" }}
                className="background-container"
            >
                <Grid
                    container
                    className="custom-mui-grid-container"
                    spacing={2}
                    sx={{
                        width: "100%",
                        marginLeft: "-4px",
                        height: "99.4vh"
                    }}
                >
                    <Grid item xs={6} md={6} style={{ margin: "1% 0", height: "100%", position: 'relative', paddingRight: "8px" }}>
                        <Box sx={{ backgroundColor: 'white', height: "96%", padding: '6px', borderRadius: '10px' }}>
                            <Box style={{ backgroundColor: "white" }}>
                                <MenuOrder />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={6} style={{ margin: "1% 0", height: "100%", position: 'relative', paddingRight: "8px" }}>
                        <Box sx={{ backgroundColor: 'white', height: "96%", padding: '6px', borderRadius: '10px' }}>
                            <Box
                                style={{
                                    backgroundColor: "white",
                                    height: "92%"
                                }}
                            >
                                <ItemOrder />
                            </Box>
                            <Box className="note">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            className='buttonNotification'
                                            size="large"
                                            variant="contained"
                                            startIcon={<MonetizationOn />}
                                            disableElevation
                                            style={{
                                                backgroundColor: !listOrderItem.length ? blue[400] : blue["A400"]
                                            }}
                                            disabled={!listOrderItem.length}
                                            onClick={handleOpenModal}
                                        >
                                            Thanh toán
                                        </Button>
                                        <Bill billItems={billItems} open={openBill} closeModal={handleCloseModal} />
                                    </Grid>
                                    <Grid item xs={6} sx={{ paddingRight: "16px" }}>
                                        <Button
                                            className='buttonNotification'
                                            size="large"
                                            variant="contained"
                                            startIcon={<CircleNotifications />}
                                            disableElevation
                                            style={{
                                                backgroundColor: !listOrderItem?.find(e => e.status === NEW) || isLoading ? purple[200] : purple[500]
                                            }}
                                            disabled={!listOrderItem?.find(e => e.status === NEW) || isLoading}
                                            onClick={handleStatusChange}
                                        >
                                            Gửi bếp/bar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid className='footer' item
                >
                    Hỗ trợ:19006522 | Chi nhánh trung tâm: Thừa Thiên Huế | NKL-2023
                </Grid>
            </Box>
        </MenuOrderContext.Provider>
    );
};

export default MainContents;