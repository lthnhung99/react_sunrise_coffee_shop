/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAllProductToNewTable, getAllTableOrder, getListOrderDetailByTableId, loadTableOrder } from './reducers/mainSlice';
import { red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Swal from 'sweetalert';

const SwitchTables = ({ open, closeModal }) => {
    const [currentTable, setCurrentTable] = useState('');
    const [targetTable, setTargetTable] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTableOrder());
    }, [])

    const listTable = useSelector(state => state.main.data.allTables)
    const mainFilters = useSelector((state) => state.main.filters);
    const listTableBusy = listTable.filter(table => table.status === "BUSY");
    const listTableEmpty = listTable.filter(table => table.status === "EMPTY");

    const handleCurrentTableChange = (event) => {
        setCurrentTable(event.target.value);
    };

    const handleTargetTableChange = (event) => {
        setTargetTable(event.target.value);
    };

    const handleSwitchTables = async (oldTableId, newTableId) => {
        await dispatch(changeAllProductToNewTable({ oldTableId, newTableId }));
        closeModal();
        dispatch(loadTableOrder({
            page: mainFilters.page,
            size: mainFilters.size,
            search: mainFilters.search,
            totalPages: mainFilters.totalPages
        })).then(() => {
            mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(mainFilters.tableSelected))
        }
        ).then(() => {
            Swal({
                title: "Thành công!",
                text: "Chuyển bàn thành công!",
                icon: "success",
                timer: 1500
            });
        })
    };

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h3'>Chuyển bàn</DialogTitle>
            <DialogContent>
                <DialogContentText variant='h5'>
                    Vui lòng chọn thông tin để chuyển bàn.
                </DialogContentText>
                <Box sx={{ display: 'flex', marginTop: "2%" }}>
                    <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                        <InputLabel id="currentTable">Bàn muốn chuyển</InputLabel>
                        <Select
                            margin="dense"
                            value={currentTable}
                            onChange={handleCurrentTableChange}
                            input={<OutlinedInput id="currentTable" label="Bàn muốn chuyển" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {listTableBusy?.map(table => (
                                <MenuItem key={table.id} value={table.id}>
                                    {table.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                        <InputLabel id="targetTable">Bàn chuyển đến</InputLabel>
                        <Select
                            margin="dense"
                            value={targetTable}
                            onChange={handleTargetTableChange}
                            input={<OutlinedInput id="targetTable" label="Bàn chuyển đến" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {listTableEmpty?.map(table => (
                                <MenuItem key={table.id} value={table.id}>
                                    {table.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions >
                <Box style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="large"
                        variant="contained"
                        startIcon={<ChangeCircleIcon />}
                        disableElevation
                        onClick={() => handleSwitchTables(currentTable, targetTable)}
                    >
                        Chuyển bàn
                    </Button>
                    <Button
                        className='buttonModalBill'
                        size="large"
                        variant="contained"
                        startIcon={<CancelIcon />}
                        disableElevation
                        onClick={closeModal}
                        style={{
                            backgroundColor: red["A400"]
                        }}
                    >
                        Đóng
                    </Button>
                </Box>

            </DialogActions>
        </Dialog>
    );
};

export default SwitchTables;