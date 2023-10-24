import React from 'react';
import Search from "../headerLeft/Search";
import { Box } from '@mui/material';
import CustomTabs from '../headerLeft/CustomTabs';
import TabPanel from '../headerLeft/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct, loadTableOrder } from '../reducers/mainSlice';

const MenuOrder = () => {
    const [value, setValue] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [typingTimeout, setTypingTimeout] = React.useState(null);
    const mainFilters = useSelector((state) => state.main.filters);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(
            mainFilters.tab === "table" ?
                loadTableOrder({
                    size: mainFilters.size,
                    page: 0,
                    search: search,
                }) : loadProduct({
                    size: mainFilters.size,
                    page: 0,
                    search: search,
                }));
    };

    const handleInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
        clearTimeout(typingTimeout);
        const timeout = setTimeout(() => {
            dispatch(
                mainFilters.tab === "table" ?
                    loadTableOrder({
                        size: mainFilters.size,
                        page: 0,
                        search: value,
                    }) : loadProduct({
                        size: mainFilters.size,
                        page: 0,
                        search: value,
                    }));
        }, 1000);
        setTypingTimeout(timeout);
    };

    const removeInput = (e) => {
        e.preventDefault();
        setSearch("");
        clearTimeout(typingTimeout);
        const timeout = setTimeout(() => {
            dispatch(
                mainFilters.tab === "table" ?
                    loadTableOrder({
                        size: mainFilters.size,
                        page: 0,
                        search: "",
                    }) : loadProduct({
                        size: mainFilters.size,
                        page: 0,
                        search: "",
                    }));
        }, 500);
        setTypingTimeout(timeout);
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <CustomTabs value={value} onChange={handleTabChange} />
                <Search
                    handleSearch={handleSearch}
                    handleInput={handleInput}
                    removeInput={removeInput}
                    search={search} />
            </Box>
            <TabPanel value={value} index={0} search={search} />
        </Box>
    );
};

export default MenuOrder;