import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BoltIcon from "@mui/icons-material/Bolt";
import AddIcon from "@mui/icons-material/Add";
import "../style.css";
import MultiActionAreaCard from "./MultiActionAreaCard";
import { BackupTable, MenuBook, TableRestaurant } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CustomTabPanel(props) {
  const { children, value, index, ss, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "calc(100vh - 155px)" }}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <MultiActionAreaCard />
          {/* <MultiActionAreaCard />
          <MultiActionAreaCard />
          <MultiActionAreaCard />
          <MultiActionAreaCard />
          <MultiActionAreaCard /> */}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflowY: "scroll",
          height: "100%",
        }}
      >
        <Box
          sx={{
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              style={{
                borderRadius: "25px 0 0 0",
                display: "flex",
                alignItems: "center",
              }}
              icon={<BackupTable style={{ marginRight: "10px" }} />}
              label="Phòng"
              {...a11yProps(0)}
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            />
            <Tab
              style={{
                display: "flex",
                alignItems: "center",
              }}
              icon={<TableRestaurant style={{ marginRight: "10px" }} />}
              label="Bàn"
              {...a11yProps(1)}
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            />
            <Tab
              style={{
                display: "flex",
                alignItems: "center",
              }}
              icon={<MenuBook style={{ marginRight: "10px" }} />}
              label="Thực đơn"
              {...a11yProps(2)}
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </Tabs>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Paper
              component="form"
              sx={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                borderRadius: "20px",
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                }}
                placeholder="Search..."
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <BoltIcon
              className="rounded-icon"
              sx={{ marginLeft: "10px", marginRight: "10px" }}
            />
            <AddIcon className="rounded-icon" sx={{ marginRight: "10px" }} />
          </Box>
        </Box>
        <CustomTabPanel value={value} index={0}></CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Bàn
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Thực đơn
        </CustomTabPanel>
      </Box>
    </>
  );
}
