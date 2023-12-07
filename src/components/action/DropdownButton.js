/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useState } from 'react';
import SwitchTables from './SwitchTables';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CombineTables from './CombineTables';
import SeparateTables from './SeparateTables';
import { BARISTA } from '../../constant/AppConstant';
import { ToastifyWarning } from '../toastify/Toastify';
import { getAllTableOrder } from '../reducers/mainSlice';
import { useDispatch } from 'react-redux';

export default function MenuSimple() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openSwitchTable, setOpenSwitchTable] = useState(false);
    const handleOpenSwitchModal = () => {
        if (localStorage.getItem('roles') === BARISTA) {
            ToastifyWarning("Bạn không có quyền chuyển bàn!");
        } else {
            setOpenSwitchTable(true);
            handleClose();
        }
    };
    const handleCloseSwitchModal = () => {
        setOpenSwitchTable(false);
    };

    const [openCombineTable, setOpenCombineTable] = useState(false);
    const handleOpenCombineModal = () => {
        if (localStorage.getItem('roles') === BARISTA) {
            ToastifyWarning("Bạn không có quyền gộp bàn!");
        } else {
            setOpenCombineTable(true);
            handleClose();
        };
    };
    const handleCloseCombineModal = () => {
        setOpenCombineTable(false);
    };

    const [openSeparateTable, setOpenSeparateTable] = useState(false);
    const handleOpenSeparateModal = () => {
        if (localStorage.getItem('roles') === BARISTA) {
            ToastifyWarning("Bạn không có quyền tách bàn!");
        } else {
            setOpenSeparateTable(true);
            handleClose();
        };
    };
    const handleCloseSeparateModal = () => {
        setOpenSeparateTable(false);
    };

    React.useEffect(() => {
        dispatch(getAllTableOrder());
    }, [open, openSwitchTable, openCombineTable, openSeparateTable]);

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='blackColor'
                sx={{ width: 10 }}
            >
                <ChangeCircleIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleOpenSwitchModal}><SyncAltIcon fontSize="small" />Chuyển bàn</MenuItem>
                <MenuItem onClick={handleOpenCombineModal}><CallMergeIcon fontSize="small" />Gộp bàn</MenuItem>
                <MenuItem onClick={handleOpenSeparateModal}><CallSplitIcon fontSize="small" />Tách bàn</MenuItem>
            </Menu>
            {openSwitchTable && <SwitchTables open={openSwitchTable} closeModal={handleCloseSwitchModal} />}
            {openCombineTable && <CombineTables open={openCombineTable} closeModal={handleCloseCombineModal} />}
            {openSeparateTable && <SeparateTables open={openSeparateTable} closeModal={handleCloseSeparateModal} />}
        </div>
    );
}

