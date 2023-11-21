/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../reducers/mainSlice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Swal from 'sweetalert';
import { CASHIER, BARISTA, STAFF_ORDER } from '../../constant/AppConstant';
function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            <Link color='inherit' href='https://mui.com/'>
                Sunrise Coffee Shop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const defaultTheme = createTheme();
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.main.error);
    const isLogin = useSelector(state => state.main.loading);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = event.currentTarget;
        const obj = {
            username: data.username.value,
            password: data.password.value
        }
        dispatch(auth(obj));
    };
    useEffect(() => {
        if (!isLogin) {
            if (localStorage.getItem('roles') === CASHIER || localStorage.getItem('roles') === STAFF_ORDER) {
                Swal({
                    title: "Thông báo!",
                    text: "Đăng nhập thành công!",
                    icon: "success",
                    timer: 1000
                });
                navigate("/");
            } else if (localStorage.getItem('roles') === BARISTA) {
                Swal({
                    title: "Thông báo!",
                    text: "Đăng nhập thành công!",
                    icon: "success",
                    timer: 1000
                });
                navigate("/kitchen");
            } else if (error) {
                navigate("/login");
                Swal({
                    title: "Thông báo!",
                    text: error.message || error.username || error.password,
                    icon: "error",
                    timer: 1500
                });
            }
        }

    }, [isLogin, error]);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sunrise Coffee Shop
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='username'
                                autoComplete='email'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <FormControlLabel
                                control={<Checkbox value='remember' color='primary' />}
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
export default LoginForm;