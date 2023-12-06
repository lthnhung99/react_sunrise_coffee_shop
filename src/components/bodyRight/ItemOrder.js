/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useId, useState } from "react";
import { Box, Tab, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyDropdown from "../headerRight/MyDropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import LiquorIcon from '@mui/icons-material/Liquor';
import mainSlice, { deleteOrderItem, getListOrderDetailByTableId, updateOrder } from "../reducers/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "./FormatPrice";
import LAYOUT, { COOKING, NEW, STOCK_OUT, URL_SOCKET, WAITING } from "../../constant/AppConstant";
import CustomTypography from "../../constant/CustomTypography";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Loading from "../loading/Loading";
import Swal from 'sweetalert';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ReactHowler from "react-howler";
import { Link } from "react-router-dom";
import { ToastifyError, ToastifySuccess } from "../toastify/Toastify";

const ItemOrder = () => {
  const dispatch = useDispatch();
  const listOrderItem = useSelector((state) => state.main.data.order.orderItems);
  const mainFilters = useSelector((state) => state.main.filters);
  const loadingOrder = useSelector(state => state.main.loadingOrder);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const connectToWebSocket = async () => {
      const socket = new SockJS(URL_SOCKET);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame) => {
        // console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/reception', (mess) => {
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
      ToastifySuccess(message);
      mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(mainFilters.tableSelected))
        .then(() => {
          setPlay(false);
          setMessage('');
        });
      setShowAlert(false);
    }
  }, [showAlert, message]);

  const totalPrice = () => {
    const listOrderItemNotStockOut = listOrderItem.filter((item) => item.status !== STOCK_OUT);
    if (listOrderItemNotStockOut.length === 0) {
      return 0;
    }
    const totalPrice = listOrderItemNotStockOut.reduce((acc, item) => acc + item?.amount, 0);
    return totalPrice;
  };

  const handleDeleteItem = (product) => {
    if (product.status === NEW || product.status === STOCK_OUT) {
      Swal({
        title: "Bạn chắc chắn muốn xóa?",
        text: "Hành động này sẽ không thể hoàn tác!",
        icon: "warning",
        buttons: ["Hủy", "Xóa"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteOrderItem(product.orderDetailId))
            .then(() => {
              ToastifySuccess("Sản phẩm đã được xóa!");
            })
        }
      });
    } else if (product.status === COOKING || product.status === WAITING) {
      ToastifyError("Món này đang được làm, không thể xoá!");
    } else {
      ToastifyError("Món này đã được làm xong, không thể xoá!");
    };
  };

  const handleQuantityChange = async (productId, orderDetailId, quantity) => {
    const quantities = listOrderItem.find(e => e.orderDetailId === orderDetailId).quantity;
    const data = JSON.parse(JSON.stringify(listOrderItem));
    let i = data.findIndex(e => e.orderDetailId === orderDetailId);
    data[i].quantity += quantity;
    const newQuantity = quantities + quantity;
    if (newQuantity === 0) {
      handleDeleteItem(orderDetailId);
      return;
    }
    await dispatch(mainSlice.actions.setQuantityItem(data))

    dispatch(updateOrder({
      tableId: mainFilters.tableSelected,
      productId: productId,
      quantity: quantity,
      note: data[i].note,
      status: NEW
    }))
  };

  const Item = ({ item, index }) => {
    const key = useId();
    return (
      <>
        {loadingOrder ? <Loading /> :
          <TableRow key={"orderItem" + key}>
            <TableCell>{index + 1}</TableCell>
            {item.note ?
              <TableCell className="note">
                {item?.title}
                <Typography className="cssNote">Ghi chú: {item?.note}</Typography>
              </TableCell>
              :
              <TableCell>{item?.title}</TableCell>}
            <TableCell>{formatPrice(item?.price)}</TableCell>
            <TableCell>
              {item?.status === "NEW" ? (
                <>
                  <IconButton
                    onClick={() => handleQuantityChange(item?.productId, item?.orderDetailId, - 1)
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  {item?.quantity}
                  <IconButton
                    onClick={() => handleQuantityChange(item?.productId, item?.orderDetailId, 1)
                    }
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </>
              ) : (
                item?.quantity
              )}
            </TableCell>
            <TableCell>{formatPrice(item?.amount)}</TableCell>
            <TableCell>
              <Typography className='cssStatus'
                variant="outlined"
                sx={LAYOUT[item.status]}
              >{item?.status}
              </Typography>
            </TableCell>
            <TableCell>
              <Tooltip title="Delete">
                <Button
                  onClick={() => handleDeleteItem(item)}
                >
                  <DeleteIcon
                    style={{
                      color: "red",
                    }}
                  />
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        }
      </>
    )
  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example">
              <Tab
                label={
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {mainFilters.tableOrders.title && mainFilters.tableOrders.title + " / " + mainFilters.floorSelected}
                  </Typography>
                }
                value="1"
              />
              <MyDropdown />
            </TabList>
          </Box>
          <TabPanel value="1"></TabPanel>
        </TabContext>
      </Box>
      <Box sx={{ flexGrow: "1", maxHeight: '80%' }} className="cssScroll">
        {listOrderItem?.length > 0 ? (
          <TableContainer>
            <Table sx={{ textAlignLast: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}>#</TableCell>
                  <TableCell sx={{ width: "30%" }}>Tên</TableCell>
                  <TableCell sx={{ width: "15%" }}>Giá</TableCell>
                  <TableCell sx={{ width: "15%" }}>Số lượng</TableCell>
                  <TableCell sx={{ width: "15%" }}>Tổng tiền</TableCell>
                  <TableCell sx={{ width: "15%" }}>Trạng thái</TableCell>
                  <TableCell sx={{ width: "5%" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderItem.map((item, index) => <Item item={item} index={index} />)}
              </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "13%", right: "5%" }}>
              <Typography variant="h3">Tổng tiền: {formatPrice(totalPrice())}</Typography>
            </Box>
          </TableContainer>

        ) : (
          <CustomTypography sx={{ marginTop: "25%", textAlign: "center", width: "100%" }}>
            {mainFilters.tableSelected ? (
              <Link to="/products">
                <LiquorIcon />
              </Link>
            ) : <LiquorIcon />}
            <Typography variant="h3">Chưa có món nào</Typography>
            <Typography variant="h5" color="darkgray">Vui lòng chọn món trong thực đơn</Typography>
          </CustomTypography>
        )}
      </Box>
      <ReactHowler src='./mixkit-correct-answer-tone-2870.mp3' playing={play} />
      {showAlert}
    </>
  );
};

export default ItemOrder;