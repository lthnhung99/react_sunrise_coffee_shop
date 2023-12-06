/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Box, Grid } from '@mui/material';
import Waiting from './Waiting';
import WaitingSupply from './WaitingSupply';
import MyDropdown from '../headerRight/MyDropdown';
import { purple } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAll } from '../reducers/kitchenSlice';

const Kitchen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, []);

    return (
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
                <Grid item xs={6} md={6} paddingRight={'8px'} style={{ margin: "1% 0", height: "100%", position: 'relative' }}>
                    <Box sx={{ backgroundColor: 'white', height: "96%", padding: '6px', borderRadius: '10px' }}>
                        <Box
                            style={{
                                backgroundColor: "white",
                                height: "100%"
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ fontSize: "20px", fontWeight: "bold", marginLeft: "2%", marginTop: "1%" }}>Chờ chế biến</Box>
                            </Box>
                            <Waiting />
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={6} md={6} paddingRight={'8px'} style={{ margin: "1% 0", height: "100%", position: 'relative' }}>
                    <Box sx={{ backgroundColor: 'white', height: "96%", padding: '6px', borderRadius: '10px' }}>
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
                    </Box>
                </Grid>
            </Grid>
            <Grid className='footer'
                item
            >
                Hỗ trợ:19006522 | Chi nhánh trung tâm: Thừa Thiên Huế | NKL-2023
            </Grid>
        </Box>
    );
};

export default Kitchen;