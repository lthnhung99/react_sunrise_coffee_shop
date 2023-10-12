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
import { Link, Route, Routes } from "react-router-dom";
import TableOrder from "./TableOrder";
import Search from "./Search";
import { GithubOutlined } from "@ant-design/icons";


function CustomTabPanel(props) {
  const { children, value, index, ss, search, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "calc(100vh - 155px)", backgroundColor: "rgb(243 243 244)", borderRadius: "8px", overflow: "scroll" }}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "space-between",
            overflowY: "scroll",
            height: "96%",
            scrollbarWidth: "thin",
            scrollbarColor: "#888888 #f3f3f3",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f3f3f3",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555555",
            },
          }}
        >
          <Routes>
            <Route path="/products/list" element={<MultiActionAreaCard search={search} />} />
            <Route path="/tableOrders/list" element={<TableOrder search={search} />} />
          </Routes>
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
  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    console.log(value);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    console.log(value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
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
              component={Link}
              to='/tableOrders/list'
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
              component={Link}
              to="/products/list"
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
            {/* <Paper
              component="form"
              sx={{
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                borderRadius: "20px",
              }}
              onSubmit={handleSearch}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                }}
                placeholder="Search..."
                value={search}
                onChange={(e) => handleInput(e)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <BoltIcon
              className="rounded-icon"
              sx={{ marginLeft: "10px", marginRight: "10px" }}
            />
            <AddIcon className="rounded-icon" sx={{ marginRight: "10px" }} /> */}

            <Search />
            <IconButton
              href="https://github.com/codedthemes/mantis-free-react-admin-template"
              target="_blank"
              disableRipple
              color="secondary"
              title="Download Free Version"
              sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: "10px" }}
            >
              <BoltIcon />
            </IconButton>

            <IconButton
              href="https://github.com/codedthemes/mantis-free-react-admin-template"
              target="_blank"
              disableRipple
              color="secondary"
              title="Download Free Version"
              sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: '10px' }}
            >
              <AddIcon />
            </IconButton>
          </Box >
        </Box >
        <CustomTabPanel value={value} index={0}></CustomTabPanel>
        <CustomTabPanel value={value} index={1} search={search}>
          Bàn
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} search={search}>
          Thực đơn
        </CustomTabPanel>
      </Box >
    </>
  );
}

