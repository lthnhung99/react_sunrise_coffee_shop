import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import useTableOrders from "../hooks/useTableOrders";


const TableOrder = ({ search }) => {
    const { tableOrders } = useTableOrders(search);
    return (
        <Grid container spacing={4} sx={{ maxWidth: "100%", margin: "5px 10px 0 0" }}>
            {tableOrders &&
                tableOrders.length > 0 &&
                tableOrders.map((item) => (
                    <Grid item xs={6} sm={6} md={2} key={item.id} >
                        <Card>
                            <CardActionArea>
                                {/* <CardMedia
                  component="img"
                  height="200"
                  src={item.productAvatar.fileUrl}
                  alt="green iguana"
                /> */}
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
                ))}
        </Grid>
    );
};

export default TableOrder;