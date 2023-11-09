/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import LiquorIcon from '@mui/icons-material/Liquor';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusAllProductFromCookingToWaitingOfGroupProduct, changeStatusFromCookingToStockOutOfProduct, changeStatusOneProductFromCookingToWaitingOfGroupProduct, getAll } from './reducers/kitchenSlice';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BlockIcon from '@mui/icons-material/Block';
import Loading from "./loading/Loading";
import LAYOUT from '../constant/AppConstant';
import CustomTypography from '../constant/CustomTypography';
import swal from 'sweetalert';

const Waiting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [])

    const listOrderWaiting = useSelector((state) => state.kitchen.listOrderItem);
    const isLoading = useSelector(state => state.kitchen.loading)

    const handleStatusChangeOneProduct = async (productId, note) => {
        await dispatch(changeStatusOneProductFromCookingToWaitingOfGroupProduct({ productId, note }));
        dispatch(getAll());
    };

    const handleStatusChangeAllProduct = async (productId, note) => {
        await dispatch(changeStatusAllProductFromCookingToWaitingOfGroupProduct({ productId, note }));
        dispatch(getAll());
    };

    const handleStatusChangeStockOut = async (productId, note) => {
        await dispatch(changeStatusFromCookingToStockOutOfProduct({ productId, note }));
        dispatch(getAll())
            .then(() => {
                swal("Thành công!", "Sản phẩm đã được thông báo hết!", "success");
            });
    };

    return (
        <Box className='cssScroll'>
            {isLoading ? <Loading /> :
                <Box sx={{ flexGrow: "1" }}>
                    {listOrderWaiting && listOrderWaiting.length > 0 ? (
                        <TableContainer>
                            <Table sx={{ textAlignLast: "center" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                        <TableCell sx={{ width: "15%" }}>Trạng thái</TableCell>
                                        <TableCell sx={{ width: "30%" }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listOrderWaiting.map((item, index) => (
                                        <TableRow key={"listWaiting" + index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {item.note ?
                                                <TableCell className="note">
                                                    {item?.productTitle}
                                                    <Typography className="cssNote">Ghi chú: {item?.note}</Typography>
                                                </TableCell>
                                                :
                                                <TableCell>{item?.productTitle}</TableCell>}
                                            <TableCell>{item?.quantity}</TableCell>
                                            <TableCell>
                                                <Typography className='cssStatus'
                                                    variant="outlined"
                                                    sx={LAYOUT[item.status]}
                                                >{item?.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                                    <Button className='buttonDemo'
                                                        variant="outlined"
                                                        onClick={() => handleStatusChangeOneProduct(item.productId, item.note)}
                                                    >
                                                        <KeyboardArrowRightIcon />
                                                    </Button>
                                                    <Button className='buttonDemo'
                                                        variant="outlined"
                                                        onClick={() => handleStatusChangeAllProduct(item.productId, item.note)}
                                                    >
                                                        <KeyboardDoubleArrowRightIcon />
                                                    </Button>
                                                    <Button className='buttonDemo redColor'
                                                        variant="outlined"
                                                        onClick={() => handleStatusChangeStockOut(item.productId, item.note)}
                                                    >
                                                        <BlockIcon />
                                                    </Button>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <CustomTypography variant="body2" sx={{ marginTop: "30%", textAlign: "center" }}>
                            <LiquorIcon />
                            <Typography variant="h3">Chưa có món nào</Typography>
                        </CustomTypography>
                    )}
                </Box>
            }
        </Box>
    );
};

export default Waiting;