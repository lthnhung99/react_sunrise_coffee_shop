import { Box, Grid } from '@mui/material';
import React from 'react';
import Waiting from './Waiting';
import { Link } from 'react-router-dom';

const Kitchen = () => {
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
                        marginLeft: "-4px",
                        height: "935px"
                    }}
                >
                    <Grid item xs={6} md={7} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                        <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                            <Box style={{ backgroundColor: "white" }}>
                                <Waiting />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={5} paddingRight={'8px'} style={{ margin: "1% 0" }}>
                        <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                            <Box
                                style={{
                                    backgroundColor: "white",
                                    height: "100%"
                                }}
                            >
                                <Link to={"/"}><button>Main</button></Link>
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
        </div>
    );
};

export default Kitchen;