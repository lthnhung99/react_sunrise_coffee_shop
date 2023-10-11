// project import
// import Routes from 'routes';
import ThemeCustomization from './themes';
// import ScrollTop from './components/ScrollTop';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

import Search from './components/Search';
import { TabList, TabPanel } from "@mui/lab";
import { Box, Tabs, Tab } from "@mui/material";
import Notification from './components/Notification';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App1 = () => (
    <ThemeCustomization>
        <InputLabel htmlFor="password-login">Password</InputLabel>
        <OutlinedInput
            id="email-login"
            type="email"
            value={"values.email"}
            name="email"
            placeholder="Enter email address"
            fullWidth
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        size="large"
                    >
                        <EyeOutlined />
                    </IconButton>
                </InputAdornment>
            }
        />
        <Search />
        <Notification />



    </ThemeCustomization>
);

export default App1;
