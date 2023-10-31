import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import Waiting from './Waiting';
import WaitingSupply from './bodyRight/WaitingSupply';
import MyDropdown from './headerRight/MyDropdown';
import { purple } from '@mui/material/colors';

const Kitchen = () => {

    return (
        <Box sx={{ backgroundColor: purple[500] }}
            className="background-container"
        >
            <Grid
                container
                className="custom-mui-grid-container"
                spacing={2}
                sx={{
                    width: "100%",
                    marginLeft: "-4px",
                    height: "100%",
                    maxHeight: "100%"
                }}
            >
                <Grid item xs={6} md={7} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                    <Box sx={{ backgroundColor: 'white', height: "86%", padding: '6px', borderRadius: '10px' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ fontSize: "20px", fontWeight: "bold", marginLeft: "2%", marginTop: "1%" }}>Chờ chế biến</Box>
                            <Box>
                                <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                // variant={selectedFloor === "" ? "contained" : "outlined"}
                                >
                                    Theo Món
                                </Button>
                                <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                // variant={selectedFloor === "" ? "contained" : "outlined"}
                                >
                                    Theo Bàn
                                </Button>
                            </Box>

                        </Box>

                        <Box style={{ backgroundColor: "white" }}>
                            <Waiting />
                            {/* <WaitingSupply /> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} md={5} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                    <Box sx={{ backgroundColor: 'white', height: "86%", padding: '6px', borderRadius: '10px' }}>
                        <Box
                            style={{
                                backgroundColor: "white",
                                height: "100%"
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ fontSize: "20px", fontWeight: "bold", marginLeft: "2%", marginTop: "1%" }}>Chờ cung ứng</Box>
                                <MyDropdown />
                            </Box>
                            <WaitingSupply />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                height: "50px",
                                flexDirection: "column",
                            }}
                        >
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
    );
};

export default Kitchen;