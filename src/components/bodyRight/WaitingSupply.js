/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, styled } from "@mui/material";

import LiquorIcon from '@mui/icons-material/Liquor';
import SendIcon from '@mui/icons-material/Send';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export default function WaitingSupply() {
    const dispatch = useDispatch();
    const orderItemsSupply = useSelector((state) => state.kitchen.orderItemsWaiting);

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


    const CustomTypography = styled(Typography)(({ theme }) => ({
        "& .MuiSvgIcon-root": {
            fontSize: "10rem",
            color: "#69b1ff70"
        },
    }));

    return (
        <Box
            sx={{
                p: 3,
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "space-between",
                overflowY: "scroll",
                height: "80%",
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
            <Box sx={{ flexGrow: "1" }}>
                {orderItemsSupply && orderItemsSupply.length > 0 ? (
                    <TableContainer>
                        <Table sx={{ textAlignLast: "center" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Bàn</TableCell>
                                    <TableCell>Ghi chú</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderItemsSupply?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item?.productTitle}</TableCell>
                                        <TableCell>{item?.quantity}</TableCell>
                                        <TableCell>{item?.tableName}</TableCell>
                                        <TableCell>{item?.note}</TableCell>
                                        <TableCell>{item?.status}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined"
                                                endIcon={<SendIcon />}
                                                sx={{ borderRadius: "20px", padding: "8px 15px" }}
                                            // onClick={() => handleStatusChange(item.orderDetailId)}
                                            >
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                ) : (
                    <CustomTypography variant="body2" sx={{ marginTop: "35%", textAlign: "center" }}>
                        <LiquorIcon />
                        <Typography variant="h3">Chưa có món nào</Typography>
                    </CustomTypography>
                )}
            </Box>
        </Box>
    )
}
