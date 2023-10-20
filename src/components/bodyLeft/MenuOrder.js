import React from 'react';
import Search from "../headerLeft/Search";
import { Box } from '@mui/material';
import CustomTabs from '../headerLeft/CustomTabs';
import TabPanel from '../headerLeft/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../reducers/mainSlice';

const MenuOrder = () => {
    const [value, setValue] = React.useState(0);
    const [search, setSearch] = React.useState("");

    const mainFilters = useSelector((state) => state.main.filters);


    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(loadProduct({
            size: mainFilters.size,
            page: 0,
            search: search,
        }))
    };

    const handleInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
        dispatch(loadProduct({
            size: mainFilters.size,
            page: 0,
            search: value,
        }))
    };

    const removeInput = (e) => {
        e.preventDefault();
        setSearch("");
        dispatch(loadProduct({
            size: mainFilters.size,
            page: 0,
            search: "",
        }))
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