import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import LiquorIcon from '@mui/icons-material/Liquor';
import { useDispatch, useSelector } from 'react-redux';

const Waiting = () => {
    const dispatch = useDispatch();
    const listOrderWaiting = useSelector((state) => state.main.data.listOrderWaiting);
    const CustomTypography = styled(Typography)(({ theme }) => ({
        "& .MuiSvgIcon-root": {
            fontSize: "10rem",
            color: "#69b1ff70"
        },
    }));
    return (
        <div>
            <Box sx={{ flexGrow: "1" }}>
                {listOrderWaiting && listOrderWaiting.length > 0 ? (
                    <TableContainer>
                        <Table sx={{ textAlignLast: "center" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Ghi chú</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOrderWaiting?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>
                                            {item?.quantity}
                                        </TableCell>
                                        <TableCell>{item?.note}</TableCell>
                                        <TableCell>WAITING</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
    );
};

export default Waiting;