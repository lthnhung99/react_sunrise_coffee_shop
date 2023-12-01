import React from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
import { BARISTA, STAFF_ORDER } from '../../constant/AppConstant';

const Bill = ({ billItems, open, closeModal }) => {
    const dispatch = useDispatch();
    const table = useSelector(state => state.main.filters);
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
        if (roles === STAFF_ORDER || roles === BARISTA) {
            Swal({
                title: "Thông báo!",
                text: "Bạn không có quyền thanh toán!",
                icon: "warning",
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
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant="h3" className="textCenter">
                SUNRISE COFFEE SHOP
                <br />
                <Typography variant="h5">
                    28 Nguyễn Tri Phương
                    <br />
                    0399 578 134
                </Typography>
                <br />
                HÓA ĐƠN THANH TOÁN
            </DialogTitle>

            <DialogContent sx={{ width: "750px", height: "500px" }}>
                <Box>
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
                </Box>
            </DialogContent>
            <DialogActions>
                <Box style={{ width: "70%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="medium"
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
                    <Button
                        className='buttonModalBill'
                        size="medium"
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
                    <Button
                        className='buttonModalBill'
                        size="medium"
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
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default Bill;