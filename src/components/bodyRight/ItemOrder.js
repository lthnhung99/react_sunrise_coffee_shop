import React from 'react';
import { Box, Tab, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Order from "../Order";
import MyDropdown from "../headerRight/MyDropdown";
import { Add } from "@mui/icons-material";

const ItemOrder = () => {
    return (
        <div>
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList aria-label="lab API tabs example">
                            <Tab label="Phòng" value="1" />
                            <Tab label="Item Three" value="3" />

                            <Tab icon={
                                <IconButton
                                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                                    target="_blank"
                                    disableRipple
                                    color="secondary"
                                    title="Download Free Version"
                                    sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: "-2px" }}
                                >
                                    <Add />
                                </IconButton>
                            } />
                            <MyDropdown />
                        </TabList>
                    </Box>
                    <TabPanel value="1">Phòng</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="2"></TabPanel>
                </TabContext>
            </Box>
            <Box sx={{ flexGrow: "1" }}>
                <Order />
                <Order />
                <Order />
            </Box>
        </div>
    );
};

export default ItemOrder;