import { MenuBook, TableRestaurant } from '@mui/icons-material';
import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomTabs = () => {
    const location = useLocation();

    const tabs = [
        { label: "Bàn", icon: <TableRestaurant />, to: "/" },
        { label: "Thực đơn", icon: <MenuBook />, to: "/products" },
    ]
    return (
        <Tabs value={location.pathname} aria-label="basic tabs example">
            {tabs.map((tab, index) => (
                <Tab style={{ display: "flex", flexDirection: "row", gap: "8px" }}
                    key={index}
                    component={Link}
                    to={tab.to}
                    icon={tab.icon}
                    label={tab.label}
                    value={tab.to}
                />
            ))}
        </Tabs>
    );
};

export default CustomTabs;