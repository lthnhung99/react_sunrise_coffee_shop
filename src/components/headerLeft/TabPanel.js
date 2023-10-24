import React from 'react';
import { Route, Routes } from 'react-router';
import Products from '../bodyLeft/Products';
import TableOrder from '../bodyLeft/TableOrder';
import { Box } from '@mui/material';
import PropTypes from "prop-types";

const TabPanel = ({ value, index, search }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                height: "calc(100vh - 194px)",
                borderRadius: "10px",
            }}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                        justifyContent: "space-between",
                        overflowY: "scroll",
                        height: "100%",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#888888 #f3f3f3",
                        "&::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#f3f3f3",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#888888",
                            borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: "#555555",
                        },
                    }}
                >
                    <Routes>
                        <Route path="/" element={<TableOrder search={search} />} />
                        <Route path="/products" element={<Products search={search} />} />
                    </Routes>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    search: PropTypes.string.isRequired
};

export default TabPanel;