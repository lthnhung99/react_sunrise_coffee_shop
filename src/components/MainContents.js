import React from 'react';
import { Box, Button, Grid } from "@mui/material";
import MenuOrder from './bodyLeft/MenuOrder';
import ItemOrder from './bodyRight/ItemOrder';
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';

const MainContents = () => {
    return (
        <div>
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
        </div>
    );
};

export default MainContents;