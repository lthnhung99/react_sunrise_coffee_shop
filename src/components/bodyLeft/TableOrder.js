import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, FormControl, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import useTableOrders from "../../hooks/useTableOrders";
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';

const TableOrder = ({ search }) => {
    const { tableOrders, isLoading } = useTableOrders(search);
    const [selectedFloor, setSelectedFloor] = useState("");
    const navigate = useNavigate();

    const zoneTitles = [...new Set(tableOrders.map((item) => item.zone.title))];

    const filteredTableOrders = selectedFloor
        ? tableOrders
            .filter((item) => item.zone.title === selectedFloor)
            .sort((a, b) => {
                if (a.zone.title === b.zone.title) {
                    return a.title.localeCompare(b.title);
                }
                return a.zone.title.localeCompare(b.zone.title);
            })
        : tableOrders.sort((a, b) => {
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
        <>
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
                            },
                        }}
                    >
                        {isLoading ? (
                            ""
                        ) : (
                            <Button
                                onClick={() => setSelectedFloor("")}
                                variant={selectedFloor === "" ? "contained" : "outlined"}
                            >
                                Tất cả
                            </Button>
                        )}

                        {zoneTitles.map((title) => (
                            <Button
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
            {isLoading ? <Loading /> :
                <Grid container spacing={4} sx={{ maxWidth: "100%", margin: "-350px 10px 0 0" }}>
                    {filteredTableOrders.length > 0 ? (
                        filteredTableOrders.map((item) => (
                            <Grid item xs={6} sm={6} md={2} key={item.id}>
                                <Card>
                                    <CardActionArea onClick={() => handleTableOrderClick(item.title)}>
                                        <CardContent>
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
                </Grid>}

        </>
    );
};


export default TableOrder;