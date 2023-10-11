import "./App.css";
import { Box, Button, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CustomTabPanel from "./components/BasicTabs";
import Order from "./components/Order";
import MyDropdown from "./components/MyDropdown";
import { CircleNotifications, MonetizationOn, Add } from "@mui/icons-material";
import ThemeCustomization from './themes';
function App() {
  return (
    <>
      <ThemeCustomization>
        <Box
          className="background-container"
          style={{ backgroundColor: "violet" }}
        >
          <Grid
            container
            spacing={2}
            className="background-app custom-mui-grid-container"
            sx={{
              width: "100%",
              backgroundColor: "violet",
            }}
          >
            <Grid item xs={6} md={7}>
              <Box style={{ backgroundColor: "white", borderRadius: "25px" }}>
                <CustomTabPanel />
              </Box>
            </Grid>
            <Grid item xs={6} md={5}>
              <Box
                style={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: "25px",
                }}
              >
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList aria-label="lab API tabs example">
                        <Tab label="Phòng" value="1" />
                        <Tab label="Item Three" value="3" />
                        <Tab icon={<Add className="rounded-icon" />} />

                        <MyDropdown />
                      </TabList>
                    </Box>
                    <TabPanel value="1">Phòng</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="2"></TabPanel>
                  </TabContext>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    height: "calc(100% - 49px)",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ flexGrow: "1" }}>
                    <Order />
                    <Order />
                    <Order />
                  </Box>
                  <div
                    container
                    spacing={2}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      padding: "10px",
                    }}
                  >
                    <Grid>
                      <Button
                        size="large"
                        variant="contained"
                        startIcon={<MonetizationOn />}
                        disableElevation
                        style={{
                          backgroundColor: "green",
                          width: "380px",
                          margin: "5px",
                          borderRadius: "10px",
                          padding: "20px",
                        }}
                      >
                        Thanh toán
                      </Button>
                      <Button
                        size="large"
                        variant="contained"
                        startIcon={<CircleNotifications />}
                        disableElevation
                        style={{
                          width: "380px",
                          borderRadius: "10px",
                          margin: "5px",
                          padding: "20px",
                        }}
                      >
                        Thông báo
                      </Button>
                    </Grid>
                  </div>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            style={{
              // display: "flex",
              textAlign: "center",
              justifyContent: "center",
              color: "white",
              padding: "10px 0 0 0",
            }}
            item
          >
            Hỗ trợ:19006522 | Chi nhánh trung tâm: Thừa Thiên Huế | NKL-2023
          </Grid>
        </Box>
      </ThemeCustomization>
    </>
  );
}

export default App;
