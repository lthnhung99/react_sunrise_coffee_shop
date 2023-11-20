/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { combineTables, getAllTableOrder, getListOrderDetailByTableId, loadTableOrder } from './reducers/mainSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { red } from '@mui/material/colors';
import Swal from 'sweetalert';

const CombineTables = ({ open, closeModal }) => {
    const [currentTable, setCurrentTable] = useState('');
    const [targetTable, setTargetTable] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTableOrder());
    }, []);

    const listTable = useSelector(state => state.main.data.allTables);
    const mainFilters = useSelector(state => state.main.filters);
    const listTableBusy = listTable.filter(table => table.status === "BUSY");

    const handleCurrentTableChange = (event) => {
        setCurrentTable(event.target.value);
    };

    const handleTargetTableChange = (event) => {
        setTargetTable(event.target.value);
    };

    const selectedTableIds = [currentTable];

    const handleCombineTables = async (currentTableId, targetTableId) => {
        await dispatch(combineTables({ currentTableId, targetTableId }));
        closeModal();
        dispatch(loadTableOrder({
            page: mainFilters.page,
            size: mainFilters.size,
            search: mainFilters.search,
            totalPages: mainFilters.totalPages
        })).then(() => {
            mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(mainFilters.tableSelected));
        }
        ).then(() => {
            Swal({
                title: "Thành công!",
                text: "Gộp bàn thành công!",
                icon: "success",
                timer: 1500
            });
        })
    };

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h3'>Gộp bàn</DialogTitle>
            <DialogContent>
                <DialogContentText variant='h5'>
                    Vui lòng chọn thông tin để gộp bàn.
                </DialogContentText>
                <Box sx={{ display: 'flex', marginTop: "2%" }}>
                    <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                        <InputLabel id="currentTable">Bàn bị gộp</InputLabel>
                        <Select
                            margin="dense"
                            value={currentTable}
                            onChange={handleCurrentTableChange}
                            input={<OutlinedInput id="currentTable" label="Bàn bị gộp" />}
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
                        <InputLabel id="targetTable">Bàn muốn gộp</InputLabel>
                        <Select
                            margin="dense"
                            value={targetTable}
                            onChange={handleTargetTableChange}
                            input={<OutlinedInput id="targetTable" label="Bàn muốn gộp" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                    },
                                },
                            }}
                        >
                            {listTableBusy?.filter(table => !selectedTableIds.includes(table.id))
                                .map(table => (
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
                        startIcon={<CallMergeIcon />}
                        disableElevation
                        onClick={() => handleCombineTables(currentTable, targetTable)}
                    >
                        Gộp bàn
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

export default CombineTables;