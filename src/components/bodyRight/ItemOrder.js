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
import LAYOUT from "../../constant/AppConstant";
import CustomTypography from "../../constant/CustomTypography";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Loading from "../loading/Loading";
import Swal from 'sweetalert';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import swal from 'sweetalert';

const ItemOrder = () => {
  const dispatch = useDispatch();
  const listOrderItem = useSelector((state) => state.main.data.order.orderItems);
  const mainFilters = useSelector((state) => state.main.filters);
  const tookNote = mainFilters.products.tookNote;
  const loadingOrder = useSelector(state => state.main.loadingOrder);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const connectToWebSocket = async () => {
      const socket = new SockJS('http://localhost:9000/ws');
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
      swal({
        title: "Thông báo!",
        text: message,
        icon: "warning",
      }).then(
        mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(mainFilters.tableSelected))
      ).then(() => {
        setMessage('');
      });
      setShowAlert(false);
    }
  }, [showAlert, message]);

  const totalPrice = () => {
    const listOrderItemNotStockOut = listOrderItem.filter((item) => item.status !== "STOCK_OUT");
    if (listOrderItemNotStockOut.length === 0) {
      return 0;
    }
    const totalPrice = listOrderItemNotStockOut.reduce((acc, item) => acc + item?.amount, 0);
    return totalPrice;
  };

  const handleDeleteItem = (product) => {
    if (product.status === 'NEW' || product.status === 'STOCK_OUT') {
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
              Swal("Thành công!", "Sản phẩm đã được xóa!", "success");
            })
        }
      });
    } else {
      Swal("Lỗi!", "Món này đang được làm không thể xoá!", "error");
    }
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
      note: tookNote,
      status: "NEW"
    }))
  };

  const Item = ({ item, index }) => {
    const key = useId();
    return (
      <>
        {loadingOrder ? <Loading /> :
          <TableRow key={key}>
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
                    {mainFilters.tableOrders.title && mainFilters.tableOrders.title + " / " + mainFilters.tableOrders.floor}
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
      <Box sx={{ flexGrow: "1" }}>
        {listOrderItem?.length > 0 ? (
          <TableContainer>
            <Table sx={{ textAlignLast: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell sx={{ width: "15%" }}>Trạng thái</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderItem.map((item, index) => <Item item={item} index={index} />)}
              </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "10%", right: "5%" }}>
              <Typography variant="h3">Tổng tiền: {formatPrice(totalPrice())}</Typography>
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
      {showAlert}
    </>
  );
};

export default ItemOrder;