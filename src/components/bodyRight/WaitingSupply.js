/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import LiquorIcon from '@mui/icons-material/Liquor';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { changeStatusFromWaitingToDoneAllProductOfOrder, changeStatusFromWaitingToDoneOfProduct, getAll } from '../reducers/kitchenSlice';
import Loading from '../loading/Loading';
import LAYOUT, { CASHIER, STAFF_ORDER, URL_SOCKET } from '../../constant/AppConstant';
import CustomTypography from '../../constant/CustomTypography';
import Swal from 'sweetalert';
import ReactHowler from 'react-howler';

export default function WaitingSupply() {
    const dispatch = useDispatch();
    const orderItemsSupply = useSelector((state) => state.kitchen.orderItemsWaiting);
    const isLoading = useSelector(state => state.kitchen.loading)
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const connectToWebSocket = async () => {
            const socket = new SockJS(URL_SOCKET);
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                // console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/kitchen', (mess) => {
                    // console.log('Received: ' + mess.body);
                    let obj = JSON.parse(mess.body);
                    setMessage(obj.data.message);
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

    useEffect(() => {
        if (message) {
            setShowAlert(true);
        }
    }, [message]);

    useEffect(() => {
        if (showAlert) {
            setPlay(true);
            Swal({
                title: "Thông báo!",
                text: message,
                icon: "warning",
                timer: 1500
            }).then(() => {
                dispatch(getAll());
            }
            ).then(() => {
                setMessage('');
                setPlay(false);
            });
            setShowAlert(false);
        }
    }, [showAlert, message]);

    const handleStatusChangeOneProduct = async (orderDetailId) => {
        if (localStorage.getItem('roles') === CASHIER || localStorage.getItem('roles') === STAFF_ORDER) {
            Swal({
                title: "Cảnh báo!",
                text: "Bạn không có quyền!",
                icon: "warning",
                timer: 1500
            });
        } else {
            await dispatch(changeStatusFromWaitingToDoneOfProduct(orderDetailId));
            dispatch(getAll());
        };
    };

    const handleStatusChangeAllProduct = async (orderDetailId) => {
        if (localStorage.getItem('roles') === CASHIER || localStorage.getItem('roles') === STAFF_ORDER) {
            Swal({
                title: "Cảnh báo!",
                text: "Bạn không có quyền!",
                icon: "warning",
                timer: 1500
            });
        } else {
            await dispatch(changeStatusFromWaitingToDoneAllProductOfOrder(orderDetailId));
            dispatch(getAll());
        };
    };

    return (
        <Box className='cssScroll'>
            <Box sx={{ flexGrow: "1" }}>
                {orderItemsSupply && orderItemsSupply.length > 0 ? (
                    <TableContainer>
                        <Table sx={{ textAlignLast: "center" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: "5%" }}>#</TableCell>
                                    <TableCell sx={{ width: "35%" }}>Tên sản phẩm</TableCell>
                                    <TableCell sx={{ width: "10%" }}>Số lượng</TableCell>
                                    <TableCell sx={{ width: "15%" }}>Bàn</TableCell>
                                    <TableCell sx={{ width: "15%" }}>Trạng thái</TableCell>
                                    <TableCell sx={{ width: "20%" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            {isLoading ? <Loading /> :
                                <TableBody>
                                    {orderItemsSupply.map((item, index) => (
                                        <TableRow key={"listSupply" + index}>
                                            <TableCell>{index + 1}</TableCell>
                                            {item.note ?
                                                <TableCell className="note">
                                                    {item?.productTitle}
                                                    <Typography className="cssNote">Ghi chú: {item?.note}</Typography>
                                                </TableCell>
                                                :
                                                <TableCell>{item?.productTitle}</TableCell>}
                                            <TableCell>{item?.quantity}</TableCell>
                                            <TableCell>{item?.tableName}</TableCell>
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
                                                        onClick={() => handleStatusChangeOneProduct(item.orderDetailId)}
                                                    >
                                                        <KeyboardArrowRightIcon />
                                                    </Button>
                                                    <Button className='buttonDemo'
                                                        variant="outlined"
                                                        onClick={() => handleStatusChangeAllProduct(item.orderDetailId)}
                                                    >
                                                        <KeyboardDoubleArrowRightIcon />
                                                    </Button>
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                ) : (
                    <CustomTypography sx={{ marginTop: "30%", textAlign: "center", width: "100%" }}>
                        <LiquorIcon />
                        <Typography variant="h3">Chưa có món nào</Typography>
                    </CustomTypography>
                )}
            </Box>
            <ReactHowler src='./mixkit-correct-answer-tone-2870.mp3' playing={play} />
            {showAlert}
        </Box>
    )
}
