import React from "react";
import { Box, IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Notification from "../headerRight/Notification";
import Profile from "./Profile/Profile";
import DropdownButton from "../DropdownButton";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

function MyDropdown() {
  const location = useLocation();
  const tableId = useSelector(state => state.main.filters.tableSelected);
  const listOrderItem = useSelector((state) => state.main.data.order.orderItems);

  return (
    <Box
      style={{
        position: "absolute",
        right: "15px",
        alignItems: "space-between",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        {location.pathname === "/kitchen" ? "" : (tableId && listOrderItem.length > 0) ?
          <IconButton
            disableRipple
            title="Thao tác với bàn"
            color="secondary"
            sx={{
              bgcolor: "grey.100",
              marginRight: "4px",
            }}
          >
            <DropdownButton />
          </IconButton> : ""}
        <IconButton
          disableRipple
          color="secondary"
          title="Bật tắt âm lượng"
          sx={{
            color: "text.primary",
            bgcolor: "grey.100",
            marginRight: "4px",
          }}
        >
          <VolumeUpIcon />
        </IconButton>
        {/* <Notification /> */}
        {/* <IconButton
          disableRipple
          color="secondary"
          title="In hóa đơn"
          sx={{
            color: "text.primary",
            bgcolor: "grey.100",
            marginRight: "4px",
          }}
          onClick={handlePrint}
        >
          <LocalPrintshopIcon />
        </IconButton> */}

        <Profile />
      </Box>
    </Box>
  );
}
export default MyDropdown;
