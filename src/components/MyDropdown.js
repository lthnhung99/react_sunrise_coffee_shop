import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Notification from './Notification';
function MyDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [setSelectedOption] = useState("");

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    setSelectedOption(value);
    setAnchorEl(null);
  };

  return (
    <Box
      style={{
        position: "absolute",
        right: "10px",

        alignItems: "space-between",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          href="https://github.com/codedthemes/mantis-free-react-admin-template"
          target="_blank"
          disableRipple
          color="secondary"
          title="Download Free Version"
          sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: "-2px" }}
        >
          <VolumeUpIcon />
        </IconButton>
        <Notification />
        <IconButton
          href="https://github.com/codedthemes/mantis-free-react-admin-template"
          target="_blank"
          disableRipple
          color="secondary"
          title="Download Free Version"
          sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: "4px" }}
        >
          <LocalPrintshopIcon />
        </IconButton>
        <span>Username</span>
        <IconButton
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          onClick={handleIconClick}
        >
          <FormatAlignJustifyIcon style={{ top: "0px" }} />
        </IconButton>
      </Box>

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("option1")}>
          Nhà bếp
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("option2")}>
          Lễ tân
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("option3")}>
          Doanh thu
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default MyDropdown;
