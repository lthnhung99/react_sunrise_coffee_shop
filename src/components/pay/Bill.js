import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Box, Grid } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { MonetizationOn } from '@mui/icons-material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import CancelIcon from '@mui/icons-material/Cancel';
import ComponentToPrint from '../pay/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBill } from '../reducers/mainSlice';
import formatPrice from '../bodyRight/FormatPrice';
import Swal from 'sweetalert';

const Bill = ({ billItems, closeModal }) => {
    const dispatch = useDispatch();
    const table = useSelector(state => state.main.filters);
    // const createdAt = useSelector(state => state.main.data.order.createdAt);
    const isLoading = useSelector(state => state.main.loadingOrder);
    const roles = localStorage.getItem("roles");
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getTotalAmount = () => {
        return billItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const pay = () => {
        if (roles === "STAFF_ORDER") {
            Swal({
                title: "Thông báo!",
                text: "Nhân viên phục vụ không thể thanh toán!",
                icon: "error",
                timer: 1000
            });
        } else {
            dispatch(createBill(table.tableSelected))
                .then(closeModal)
                .then(() => {
                    Swal({
                        title: "Thành công!",
                        text: "Thanh toán thành công!",
                        icon: "success",
                        timer: 1000
                    });
                })
        }
    }

    return (
        <Paper style={{ height: 700, width: "50%", bottom: "20%", left: "25%", position: "absolute" }}>
            <TableContainer sx={{ maxHeight: "85%", overflow: "auto" }}>
                <Typography variant="h3" gutterBottom className='textCenter' sx={{ marginTop: '3%' }}>SUNRISE COFFEE SHOP</Typography>
                <Typography variant="h5" gutterBottom className='textCenter'>28 Nguyễn Tri Phương</Typography>
                <Typography variant="h5" gutterBottom className='textCenter'>0399 578 134</Typography>
                <Typography variant="h3" gutterBottom className='textCenter'>HÓA ĐƠN THANH TOÁN</Typography>
                <Table sx={{ marginLeft: "10%", width: "80%" }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Tên món</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell align="right">Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billItems.map((item, index) => (
                            <TableRow key={"bill" + index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatPrice(item.price)}</TableCell>
                                <TableCell align="right">{formatPrice(item.amount)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} align="right" className='bold'>
                                Tổng cộng:
                            </TableCell>
                            <TableCell align="right" className='bold'>{formatPrice(getTotalAmount())}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Box
                    sx={{
                        display: "flex",
                        height: "50px",
                        flexDirection: "column",
                        position: "absolute",
                        bottom: "5%",
                        right: "5%",
                        width: "70%"
                    }}
                >
                    <Grid container spacing={2} sx={{ marginBottom: "10px", width: "100%", textAlign: "end" }}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <Button
                                className='buttonModalBill'
                                size="large"
                                variant="contained"
                                startIcon={<MonetizationOn />}
                                disableElevation
                                style={{
                                    backgroundColor: blue["A400"]
                                }}
                                onClick={pay}
                                disabled={isLoading}
                            >
                                Thanh toán
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                className='buttonModalBill'
                                size="large"
                                variant="contained"
                                startIcon={<LocalPrintshopIcon />}
                                disableElevation
                                onClick={handlePrint}
                            >
                                In hóa đơn
                            </Button>
                            {<div style={{ display: 'none' }}>
                                <ComponentToPrint ref={componentRef} billItems={billItems} tableName={table.tableOrders.title} />
                            </div>}
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                className='buttonModalBill'
                                size="large"
                                variant="contained"
                                startIcon={<CancelIcon />}
                                disableElevation
                                onClick={closeModal}
                                style={{
                                    backgroundColor: red["A400"]
                                }}
                            >
                                Đóng
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </TableContainer>
        </Paper>
    );
};

export default Bill;