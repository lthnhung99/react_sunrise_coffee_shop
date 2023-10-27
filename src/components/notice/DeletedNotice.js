/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from "../reducers/mainSlice";

const DeletedNotice = () => {
    const deleteSuccess = useSelector(state => state.main.deletedNotice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (deleteSuccess) {
            const timer = setTimeout(() => {
                dispatch(mainSlice.actions.setDeletedNotice(false))
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [deleteSuccess]);

    return (
        <Stack sx={{ position: "absolute", bottom: "7%", left: "2%", width: '15%' }} spacing={2}>
            <Alert
                variant="filled"
                severity="success"
                onClose={() => dispatch(mainSlice.actions.setDeletedNotice(false))}
            >
                Xóa thành công!
            </Alert>
        </Stack>
    );
};

export default DeletedNotice;