import "./App.css";
import { Box, Button, Grid, Tab, IconButton } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CustomTabPanel from "./components/BasicTabs";
import Order from "./components/Order";
import MyDropdown from "./components/MyDropdown";
import { CircleNotifications, MonetizationOn, Add } from "@mui/icons-material";
import ThemeCustomization from './themes';
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <ThemeCustomization>
        <Box
          className="background-container"
        >
          <Grid
            container
            className="custom-mui-grid-container"
            spacing={1}
            sx={{
              width: "100%",
            }}
          >
            <Grid item xs={6} md={7} paddingRight={'8px'}>
              <Box sx={{ backgroundColor: 'white', padding: '6px', borderRadius: '10px' }}>
                <Box style={{ backgroundColor: "white" }}>
                  <CustomTabPanel />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={5} paddingRight={'8px'}>
              <Box sx={{ backgroundColor: 'white', height: "100%", padding: '6px', borderRadius: '10px' }}>
                <Box
                  style={{
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList aria-label="lab API tabs example">
                          <Tab label="Phòng" value="1" />
                          <Tab label="Item Three" value="3" />

                          <Tab icon={
                            <IconButton
                              href="https://github.com/codedthemes/mantis-free-react-admin-template"
                              target="_blank"
                              disableRipple
                              color="secondary"
                              title="Download Free Version"
                              sx={{ color: 'text.primary', bgcolor: 'grey.100', marginRight: "-2px" }}
                            >
                              <Add />
                            </IconButton>
                          } />
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
                    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
                      <Grid item xs={6}>
                        <Button
                          size="large"
                          variant="contained"
                          startIcon={<MonetizationOn />}
                          disableElevation
                          style={{
                            backgroundColor: "green",
                            width: "100%",
                            margin: "5px",
                            borderRadius: "10px",
                          }}
                        >
                          Thanh toán
                        </Button>
                      </Grid>
                      <Grid item xs={6} sx={{ paddingRight: "16px" }}>
                        <Button
                          size="large"
                          variant="contained"
                          startIcon={<CircleNotifications />}
                          disableElevation
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            margin: "5px",
                          }}
                        >
                          Thông báo
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid>



                    </Grid>
                  </Box>
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
