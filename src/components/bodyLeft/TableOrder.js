/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';
import Pageable from "../pageable/Pageable";
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { useDispatch, useSelector } from "react-redux";
import { getListOrderDetailByTableId, loadTableOrder } from "../reducers/mainSlice";
import mainSlice from '../reducers/mainSlice';
import { purple } from "@mui/material/colors";
import CustomTypography from "../../constant/CustomTypography";
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import { BUSY, EMPTY, TAKE_AWAY } from "../../constant/AppConstant";

const TableOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tableOrders = useSelector((state) => state.main.data.tables) || [];
    const mainFilters = useSelector((state) => state.main.filters);
    const isLoading = useSelector((state) => state.main.loading);
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const count = useSelector((state) => state.main.counts);
    const allTables = useSelector((state) => state.main.data.allTables) || [];

    const setPage = (page) => {
        dispatch(loadTableOrder({
            page: page,
            size: mainFilters.tableOrders.size,
            zone: selectedFloor,
            status: selectedStatus,
            search: mainFilters.search,
            totalPages: mainFilters.tableOrders.totalPages
        }));
    };

    useEffect(() => {
        let countBusy = 0;
        let countEmpty = 0;
        for (const item of allTables) {
            if (!item.title.includes(mainFilters.search)) continue;
            if (item.status === BUSY &&
                (selectedFloor === '' || selectedFloor === item.zone.title)) {
                countBusy++;
            };
            if (item.status === EMPTY &&
                (selectedFloor === '' || selectedFloor === item.zone.title)) {
                countEmpty++;
            };
        };

        dispatch(mainSlice.actions.setCounts({
            countBusy,
            countEmpty,
            countTotal: countBusy + countEmpty,
        }));

        dispatch(
            loadTableOrder({
                search: mainFilters.search,
                zone: selectedFloor === TAKE_AWAY ? "zone 4" : selectedFloor,
                status: selectedStatus,
                page: 0,
                size: mainFilters.tableOrders.size,
                totalPages: mainFilters.tableOrders.totalPages,
            })
        );
    }, [allTables, selectedFloor, selectedStatus, mainFilters.search]);

    const zoneTitles = [...new Set(allTables?.map((item) => item.zone.title))];
    const tableOrderStatus = [...new Set(allTables?.map((item) => item.status))];

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);
    };

    const filteredTableOrders = selectedFloor
        ? tableOrders
            .filter((item) => item.zone.title === selectedFloor)
            .filter((item) => !selectedStatus || item.status === selectedStatus)
            .sort((a, b) => {
                const numA = extractNumberFromTitle(a.title);
                const numB = extractNumberFromTitle(b.title);
                return numA - numB;
            })
        : tableOrders
            .filter((item) => !selectedStatus || item.status === selectedStatus)
            .sort((a, b) => {
                const numA = extractNumberFromTitle(a.title);
                const numB = extractNumberFromTitle(b.title);
                return numA - numB;
            });

    function extractNumberFromTitle(title) {
        const match = title.match(/\d+/);
        if (match) {
            return parseInt(match[0], 10);
        }
        return NaN;
    };

    const handleTableOrderClick = (tableOrder) => {
        dispatch(mainSlice.actions.setTableSelected(tableOrder.id));
        dispatch(mainSlice.actions.setTableTitle(tableOrder.title));
        dispatch(mainSlice.actions.setZoneTitle(tableOrder.zone.title));
        dispatch(getListOrderDetailByTableId(tableOrder.id));
        navigate('/products');
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box sx={{ marginBottom: "10px" }}>
                <FormControl component="fieldset">
                    <ButtonGroup
                        aria-label="floor"
                        name="floor"
                        value={selectedFloor}
                        variant="outlined"
                        sx={{
                            flexDirection: "row",
                            "& .MuiButton-root": {
                                borderRadius: "10px"
                            }
                        }}
                    >
                        <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                            onClick={() => setSelectedFloor("")}
                            variant={selectedFloor === "" ? "contained" : "outlined"}
                        >
                            Tất cả
                        </Button>
                        {zoneTitles.sort().map((title) => (
                            <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                key={title}
                                onClick={() => setSelectedFloor(title)}
                                variant={selectedFloor === title ? "contained" : "outlined"}
                            >
                                {title}
                            </Button>
                        ))}
                    </ButtonGroup>
                </FormControl>
            </Box>
            <Box sx={{ margin: "0 0 10px 16px" }}>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="status"
                        name="status"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        sx={{ flexDirection: "row" }}
                    >
                        <FormControlLabel
                            value=""
                            control={<Radio />}
                            label={`Tất cả (${count.countTotal})`}
                            sx={{
                                color: selectedStatus === "" ? "darkViolet" : "inherit"
                            }}
                        />
                        {tableOrderStatus?.map((status) => {
                            let label;
                            if (status === "EMPTY") {
                                label = `Còn trống (${count.countEmpty})`;
                            } else if (status === "BUSY") {
                                label = `Sử dụng (${count.countBusy})`;
                            }
                            return (
                                <FormControlLabel
                                    key={status}
                                    value={status}
                                    control={<Radio />}
                                    label={label}
                                    sx={{
                                        color: selectedStatus === status ? "darkViolet" : "inherit"
                                    }}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </Box>
            {isLoading ? <Loading /> :
                <Grid container spacing={2} sx={{ maxWidth: "100%", margin: "0 5px" }}>
                    {filteredTableOrders.length > 0 ? (
                        filteredTableOrders.map((item) => (
                            <Grid item xs={6} sm={3} md={2.8} mb={2} key={"table" + item.id}>
                                <Card sx={{ backgroundColor: item.status === "BUSY" ? purple[100] : "inherit", textAlign: "center", borderRadius: "25%" }}>
                                    <CardActionArea onClick={() => handleTableOrderClick(item)}>
                                        <CardContent>
                                            <LocalCafeIcon sx={{ fontSize: "40px" }} />
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.zone.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <CustomTypography variant="body2" sx={{ marginTop: "15%", textAlign: "center", width: "100%" }}>
                            <BrowserNotSupportedIcon />
                            <Typography variant="h3">Không tìm thấy bàn phù hợp</Typography>
                        </CustomTypography>
                    )}
                    <Pageable page={mainFilters.tableOrders.page + 1} setPage={setPage} totalPage={mainFilters.tableOrders.totalPages} />
                </Grid>
            }
        </Box>
    );
};

export default TableOrder;