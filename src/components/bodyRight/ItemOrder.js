import React from "react";
import { Box, Tab, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, styled, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyDropdown from "../headerRight/MyDropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from '@mui/icons-material/Add';
import LiquorIcon from '@mui/icons-material/Liquor';
import mainSlice, { deleteOrderItem } from "../reducers/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "./FormatPrice";
import DeletedNotice from "../notice/DeletedNotice";

const ItemOrder = () => {
  const dispatch = useDispatch();
  const listOrderItem = useSelector((state) => state.main.data.order.orderItems);
  const mainFilters = useSelector((state) => state.main.filters);
  const deleteSuccess = useSelector(state => state.main.deletedNotice);

  const totalPrice = () => {
    if (listOrderItem.length === 0) {
      return 0;
    }
    const totalPrice = listOrderItem.reduce((acc, item) => acc + item?.amount, 0);
    return totalPrice;
  };

  const CustomTypography = styled(Typography)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
      fontSize: "10rem",
      color: "#69b1ff70"
    },
  }));

  const handleDeleteItem = async (orderDetailId) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      await dispatch(deleteOrderItem(orderDetailId));
      dispatch(mainSlice.actions.setDeletedNotice(true));
    }
  };

  const handleQuantityChange = (orderDetailId, quantity) => {
    const quantities = listOrderItem.find(e => e.orderDetailId === orderDetailId).quantity;
    const data = JSON.parse(JSON.stringify(listOrderItem));
    let i = data.findIndex(e => e.orderDetailId === orderDetailId);
    data[i].quantity += quantity;
    const newQuantity = quantities + quantity;
    if (newQuantity === 0) {
      handleDeleteItem(orderDetailId);
      return;
    }
    dispatch(mainSlice.actions.setQuantityItem(data))
  };

  function getQuantity(orderDetailId) {
    return listOrderItem.find(e => e.orderDetailId === orderDetailId).quantity || 1;
  }

  return (
    <div>
      {deleteSuccess && (
        <DeletedNotice />
      )}
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
        {listOrderItem && listOrderItem.length > 0 ? (
          <TableContainer>
            <Table sx={{ textAlignLast: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderItem?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>{formatPrice(item?.price)}</TableCell>
                    <TableCell>
                      {item?.status === "NEW" ? (
                        <>
                          <IconButton
                            onClick={() => handleQuantityChange(item?.orderDetailId, - 1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {item?.quantity}
                          <IconButton
                            onClick={() => handleQuantityChange(item?.orderDetailId, 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </>
                      ) : (
                        item?.quantity
                      )}
                    </TableCell>
                    <TableCell>{item?.note}</TableCell>
                    <TableCell>
                      {item?.status === "NEW" ? formatPrice(item?.price * getQuantity(item.orderDetailId)) : formatPrice(item?.amount)}
                    </TableCell>
                    <TableCell>{item?.status}</TableCell>
                    <TableCell>
                      <Button
                        startIcon={
                          <DeleteIcon
                            style={{
                              color: "red",
                            }}
                          />
                        }
                        onClick={() => handleDeleteItem(item?.orderDetailId)}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "15%", right: "5%" }}>
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
    </div>
  );
};

export default ItemOrder;