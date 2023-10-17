import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import useTableOrders from "../../hooks/useTableOrders";
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';
import Pageable from "../pageable/Pageable";
import LocalCafeIcon from '@mui/icons-material/LocalCafe';


const TableOrder = ({ search }) => {
    const [page, setPage] = useState(0);
    const { tableOrders, isLoading, totalPage } = useTableOrders(page, search);
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedStatus, setSelectedStatus] = useState('');

    const navigate = useNavigate();

    const zoneTitles = [...new Set(tableOrders.map((item) => item.zone.title))];
    const tableOrderStatus = [...new Set(tableOrders.map((item) => item.status))];

    const countTableOrderByStatusAndZone = (status, zone) => {
        if (zone === "") {
            return tableOrders.filter((item) => item.status === status).length;
        } else {
            return tableOrders.filter((item) => item.status === status && item.zone.title === zone).length;
        }
    };

    const orderCounts = {};
    tableOrderStatus.forEach((status) => {
        orderCounts[status] = countTableOrderByStatusAndZone(status);
    });

    const totalCount = tableOrderStatus.reduce((sum, status) => {
        return sum + countTableOrderByStatusAndZone(status, selectedFloor);
    }, 0);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredTableOrders = selectedFloor
        ? tableOrders
            .filter((item) => item.zone.title === selectedFloor)
            .filter((item) => !selectedStatus || item.status === selectedStatus)
            .sort((a, b) => {
                if (a.zone.title === b.zone.title) {
                    return a.title.localeCompare(b.title);
                }
                return a.zone.title.localeCompare(b.zone.title);
            })
        : tableOrders
            .filter((item) => !selectedStatus || item.status === selectedStatus)
            .sort((a, b) => {
                if (a.zone.title === b.zone.title) {
                    return a.title.localeCompare(b.title);
                }
                return a.zone.title.localeCompare(b.zone.title);
            });

    const handleTableOrderClick = (tableOrder) => {
        console.log(tableOrder);
        navigate('/products/list')
    }

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
                        {isLoading ? (
                            ""
                        ) : (
                            <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                onClick={() => setSelectedFloor("")}
                                variant={selectedFloor === "" ? "contained" : "outlined"}
                            >
                                Tất cả
                            </Button>
                        )}

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
                        {isLoading ? (
                            ""
                        ) : (
                            <FormControlLabel
                                value=""
                                control={<Radio />}
                                label={`Tất cả (${totalCount})`}
                                sx={{
                                    color: selectedStatus === "" ? "#1677ff" : "inherit"
                                }}
                            />
                        )}
                        {tableOrderStatus.map((status) => {
                            const count = countTableOrderByStatusAndZone(status, selectedFloor);
                            const label = `${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()} (${count})`;

                            return (
                                <FormControlLabel
                                    key={status}
                                    value={status}
                                    control={<Radio />}
                                    label={label}
                                    sx={{
                                        color: selectedStatus === status ? "#1677ff" : "inherit"
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
                            <Grid item xs={6} sm={6} md={3} key={item.id}>
                                <Card sx={{ backgroundColor: item.status === "BUSY" ? "lightBlue" : "inherit", textAlign: "center", borderRadius: "25%" }}>
                                    <CardActionArea onClick={() => handleTableOrderClick(item.title)}>
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
                        <Typography variant="body1" sx={{ margin: "20px" }}>
                            Không tìm thấy bàn này!
                        </Typography>
                    )}
                    <Pageable page={page} setPage={setPage} totalPage={totalPage} />
                </Grid>
            }
        </Box>
    );
};


export default TableOrder;