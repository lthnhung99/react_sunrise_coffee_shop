/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal } from "@mui/material";
import MenuOrder from './bodyLeft/MenuOrder';
import ItemOrder from './bodyRight/ItemOrder';
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';
import MenuOrderContext from './MenuOrderContext';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder, changeStatusCooking } from './reducers/mainSlice';
import { useLocation } from 'react-router-dom';
import mainSlice from './reducers/mainSlice';
import { blue, purple } from '@mui/material/colors';
import API_URL from './constURL/URLMain';
import Bill from './pay/Bill';
import swal from 'sweetalert';

const MainContents = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [previousSelectedProductId, setPreviousSelectedProductId] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const mainFilters = useSelector((state) => state.main.filters);
    const quantity = mainFilters.products.quantity;
    const note = mainFilters.products.note;
    const [openBill, setOpenBill] = useState(false);
    const listOrderItem = useSelector(state => state.main.data.order.orderItems || []);
    const billItems = listOrderItem.filter((item) => item.status !== "STOCK_OUT");

    const handleOpenModal = () => {
        const hasNewItem = listOrderItem.some((item) => item.status === "NEW");

        if (hasNewItem) {
            swal({
                title: "Cảnh báo!",
                text: "Có sản phẩm chưa được gửi tới bếp!",
                icon: "warning",
            })
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
                const response = await fetch(API_URL + `products/${productId}`);
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
        if (listOrderItem.length === 0) {
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
        dispatch(changeStatusCooking(mainFilters.tableSelected));
    };

    const menuOrderData = {
        selectedProduct,
        setSelectedProduct,
        handleAddProduct,
        listOrderItem
    };

    return (
        <div>
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
                        <Grid item xs={6} md={6} paddingRight={'8px'} style={{ margin: "1% 0", position: 'relative' }}>
                            <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                                <Box style={{ backgroundColor: "white" }}>
                                    <MenuOrder />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={6} paddingRight={'8px'} style={{ margin: "1% 0", position: 'relative' }}>
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
                                            <Modal open={openBill} onClose={handleCloseModal}>
                                                <Bill billItems={billItems} closeModal={handleCloseModal} />
                                            </Modal>
                                        </Grid>
                                        <Grid item xs={6} sx={{ paddingRight: "16px" }}>
                                            <Button
                                                className='buttonNotification'
                                                size="large"
                                                variant="contained"
                                                startIcon={<CircleNotifications />}
                                                disableElevation
                                                style={{
                                                    backgroundColor: !listOrderItem?.find(e => e.status === 'NEW') ? purple[200] : purple[500]
                                                }}
                                                disabled={!listOrderItem?.find(e => e.status === 'NEW')}
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
                    <Grid className='footer'
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