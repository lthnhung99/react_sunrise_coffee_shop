import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { blue, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import { ToastifyError } from '../toastify/Toastify';

export default function TransferList({ open, closeModal, setProductSplit, currentTableTitle, targetTableTitle }) {
    const listOrderItem = useSelector(state => state.main.data.order.orderItems);
    const [quantitySeparated, setQuantitySeparated] = React.useState([]);
    const [quantityOriginal, setQuantityOriginal] = React.useState(0);

    const handleQuantityChange = (productId, orderDetailId, quantity) => {
        const quantities = listOrderItem.find(e => e.orderDetailId === orderDetailId).quantity;
        console.log();
        setQuantityOriginal(quantities);
        const data = JSON.parse(JSON.stringify(quantitySeparated));
        const index = quantitySeparated.findIndex((e) => e.orderDetailId === orderDetailId);
        if (index !== -1) {
            if (quantity > 0 && quantitySeparated[index].quantity >= quantities) {
                ToastifyError('Số lượng tách không được lớn hơn số lượng gốc!');
            } else if (quantity < 0 && quantitySeparated[index].quantity <= 0) {
                ToastifyError('Số lượng tách không được nhỏ hơn 0!');
            } else {
                data[index].quantity += quantity;
                setQuantitySeparated(data);
            }
        } else {
            setQuantitySeparated([...quantitySeparated, {
                id: productId,
                quantity,
                orderDetailId
            }])
        };
    };

    const handleClick = () => {
        const filteredQuantitySeparated = quantitySeparated.filter(item => item.quantity !== 0);
        setProductSplit(filteredQuantitySeparated);
        closeModal();
    };

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h4'>
                Bàn hiện tại: {currentTableTitle}
            </DialogTitle>
            <DialogTitle variant='h4'>
                Bàn đang chọn: {targetTableTitle}
            </DialogTitle>
            <DialogTitle variant='h5'>
                Vui lòng chọn số lượng để tách bàn
            </DialogTitle>
            <DialogContent sx={{ width: "750px", height: "100%" }}>
                <Box>
                    <Table sx={{ marginLeft: "10%", width: "80%" }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Tên món</TableCell>
                                <TableCell className='textCenter'>Số lượng gốc</TableCell>
                                <TableCell className='textCenter'>Số lượng tách</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOrderItem.map((item, index) => (
                                <TableRow key={"transferList" + index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell className='textCenter'>{item.quantity}</TableCell>
                                    <TableCell className='textCenter'>
                                        <IconButton
                                            onClick={() => handleQuantityChange(item?.productId, item?.orderDetailId, - 1)}
                                            disabled={!quantitySeparated.find(e => e.orderDetailId === item.orderDetailId)?.quantity}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        {quantitySeparated.find(e => e.orderDetailId === item.orderDetailId)?.quantity || 0}
                                        <IconButton
                                            onClick={() => handleQuantityChange(item?.productId, item?.orderDetailId, 1)}
                                            disabled={quantitySeparated.find(e => e.orderDetailId === item.orderDetailId)?.quantity === quantityOriginal}
                                        >
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="medium"
                        variant="contained"
                        startIcon={<DoneIcon />}
                        disableElevation
                        style={{
                            backgroundColor: blue["A400"]
                        }}
                        onClick={handleClick}
                    >
                        Đồng ý
                    </Button>
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
}
