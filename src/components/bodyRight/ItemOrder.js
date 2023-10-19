import React, { useContext } from "react";
import { Box, Tab, IconButton, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyDropdown from "../headerRight/MyDropdown";
import { Add } from "@mui/icons-material";
import MenuOrderContext from "../MenuOrderContext";
import DeleteIcon from "@mui/icons-material/Delete";
import LiquorIcon from '@mui/icons-material/Liquor';

const ItemOrder = () => {
  const { listOrderItem, setListOrderItem } = useContext(MenuOrderContext);
  const totalPrice = listOrderItem.reduce((acc, item) => acc + item.price, 0);

  const CustomTypography = styled(Typography)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
      fontSize: "10rem",
      color: "#69b1ff70"
    },
  }));

  const handleDeleteItem = (index) => {
    const updatedList = [...listOrderItem];
    updatedList.splice(index, 1);
    setListOrderItem(updatedList);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example">
              <Tab label="Phòng" value="1" />
              <Tab label="Item Three" value="3" />

              <Tab
                icon={
                  <IconButton
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                    disableRipple
                    color="secondary"
                    title="Download Free Version"
                    sx={{
                      color: "text.primary",
                      bgcolor: "grey.100",
                      marginRight: "-2px",
                    }}
                  >
                    <Add />
                  </IconButton>
                }
              />
              <MyDropdown />
            </TabList>
          </Box>
          <TabPanel value="1">Phòng</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Box>
      <Box sx={{ flexGrow: "1" }}>
        {listOrderItem && listOrderItem.length > 0 ? (
          <TableContainer>
            <Table sx={{ textAlign: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Giá</TableCell>
                  {/* <TableCell>Số lượng</TableCell> */}
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrderItem?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    {/* <QuantityInput /> */}
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Button
                        startIcon={
                          <DeleteIcon
                            style={{
                              color: "red",
                            }}
                          />
                        }
                        onClick={() => handleDeleteItem(index)}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ position: "absolute", bottom: "15%", right: "5%", background: "red" }}>
              <Typography variant="h3">Tổng tiền: {totalPrice}</Typography>
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
