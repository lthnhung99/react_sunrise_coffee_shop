import React, { useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import LiquorIcon from '@mui/icons-material/Liquor';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusFromCookingToWaiterOfProduct, getAll } from './reducers/kitchenSlice';

const Waiting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [])

    const listOrderWaiting = useSelector((state) => state.kitchen.listOrderItem);
    console.log(listOrderWaiting);
    // const tableTitle = useSelector((state) => state.main.filters.tableOrders.title);
    const CustomTypography = styled(Typography)(({ theme }) => ({
        "& .MuiSvgIcon-root": {
            fontSize: "10rem",
            color: "#69b1ff70"
        },
    }));

    const handleStatusChange = async (orderDetailId) => {
        await dispatch(changeStatusFromCookingToWaiterOfProduct(orderDetailId));

        dispatch(getAll());
    };

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
                {listOrderWaiting && listOrderWaiting.length > 0 ? (
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
                                {listOrderWaiting?.map((item, index) => (
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
                                                onClick={() => handleStatusChange(item.orderDetailId)}
                                            >
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                ) : (
                    <CustomTypography variant="body2" sx={{ marginTop: "25%", textAlign: "center" }}>
                        <LiquorIcon />
                        <Typography variant="h3">Chưa có món nào</Typography>
                        <Typography variant="h5" color="darkgray">Vui lòng chọn món trong thực đơn</Typography>
                    </CustomTypography>
                )}
            </Box>
        </Box>
    );
};

export default Waiting;