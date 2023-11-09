import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const ViewProfile = ({ open, closeModal }) => {
    return (
        <Dialog
            open={open}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Thông báo"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Chức năng hiện đang phát triển
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewProfile;