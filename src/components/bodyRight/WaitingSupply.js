/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { CircleNotifications, MonetizationOn } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Tab, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, styled, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from '@mui/icons-material/Add';
import LiquorIcon from '@mui/icons-material/Liquor';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export default function WaitingSupply() {
    const dispatch = useDispatch();
    const orderItemsSupply = useSelector((state) => state.kitchen.orderItemsSupply);
    const quantities = 2;

    useEffect(() => {
        const connectToWebSocket = async () => {
            const socket = new SockJS('http://localhost:9000/ws'); // Thay đổi URL thành URL của Spring Boot endpoint
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/notification', (message) => {
                    console.log('Received: ' + message.body);
                });
            }, (error) => {
                console.log('Error: ' + error);
                // Xử lý các trường hợp lỗi kết nối ở đây
            });

            return () => {
                stompClient.disconnect();
            };
        };

        connectToWebSocket();
    }, []);


    const totalPrice = () => {
        if (orderItemsSupply.length === 0) {
            return 0;
        }

        const totalPrice = orderItemsSupply.reduce((acc, item) => acc + item?.amount, 0);
        return totalPrice;
    };
    const handleDeleteItem = (orderDetailId) => {
        if (window.confirm("Bạn chắc chắn muốn xóa?")) {
            // dispatch(deleteOrderItem(orderDetailId));
        }
    };
    const CustomTypography = styled(Typography)(({ theme }) => ({
        "& .MuiSvgIcon-root": {
            fontSize: "10rem",
            color: "#69b1ff70"
        },
    }));
    const handleQuantityChange = (orderDetailId, newQuantity) => {
        if (newQuantity === 0) {
            handleDeleteItem(orderDetailId);
        } else {
            // dispatch(mainSlice.actions.setQuantity(newQuantity))
        }
    };
    return (
        <div>
            <Box sx={{ flexGrow: "1" }}>
                {orderItemsSupply && orderItemsSupply.length > 0 ? (
                    <TableContainer>
                        <Table sx={{ textAlignLast: "center" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Ghi chú</TableCell>
                                    <TableCell>Tổng tiền</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderItemsSupply?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.price}</TableCell>
                                        <TableCell>
                                            {item?.status === "NEW" ? (
                                                <>
                                                    <IconButton
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item?.orderDetailId,
                                                                (quantities || item?.quantity) - 1
                                                            )
                                                        }
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    {quantities || item?.quantity}
                                                    <IconButton
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item?.orderDetailId,
                                                                (quantities || item?.quantity) + 1
                                                            )
                                                        }
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                item?.quantity
                                            )}
                                        </TableCell>
                                        <TableCell>{item?.note}</TableCell>
                                        <TableCell>
                                            {item?.status === "NEW" ? item?.amount * quantities : item?.amount}
                                        </TableCell>
                                        <TableCell>{item?.status}</TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={
                                                    <DeleteIcon
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    />
                                                }
                                                onClick={() => handleDeleteItem(item?.orderDetailId)}
                                            ></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Box sx={{ position: "absolute", bottom: "15%", right: "5%" }}>
                            <Typography variant="h3">Tổng tiền: {totalPrice()}</Typography>
                        </Box>
                    </TableContainer>

                ) : (
                    <CustomTypography variant="body2" sx={{ marginTop: "30%", textAlign: "center" }}>
                        <LiquorIcon />
                        <Typography variant="h3">Chưa có món nào</Typography>
                        <Typography variant="h5" color="darkgray">Vui lòng chọn món trong thực đơn</Typography>
                    </CustomTypography>
                )}
            </Box>
        </div>
    )
}
