import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from "@mui/material";
import MenuOrder from './bodyLeft/MenuOrder';
import ItemOrder from './bodyRight/ItemOrder';
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';
import MenuOrderContext from './MenuOrderContext';
import { useDispatch, useSelector } from 'react-redux';

import { loadProduct } from './reducers/mainSlice';

const MainContents = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [listOrderItem, setListOrderItem] = useState([]);

    const dispatch = useDispatch();

    const mainFilters = useSelector((state) => state.main.filters);
    useEffect(() => {
        dispatch(loadProduct({ page: mainFilters.page, size: mainFilters.size, search: mainFilters.search }));
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

        if (selectedProduct.id) {
            onProductSelect(selectedProduct.id);
        }
    }, [selectedProduct.id]);

    const handleAddProduct = (product) => {
        if (product && product.id) {
            setListOrderItem([...listOrderItem, product])
        }
    }
    const menuOrderData = {
        selectedProduct,
        setSelectedProduct,
        handleAddProduct,
        listOrderItem,
        setListOrderItem
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
                                                    padding: "15px 0"
                                                }}
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