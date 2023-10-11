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
import Search from "./Search";
import { GithubOutlined } from '@ant-design/icons';


function CustomTabPanel(props) {
  const { children, value, index, ss, ...other } = props;

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
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <MultiActionAreaCard />
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
