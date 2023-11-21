/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { combineTables, getListOrderDetailByTableId, loadTableOrder } from './reducers/mainSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { purple, red } from '@mui/material/colors';
import Swal from 'sweetalert';
import mainSlice from './reducers/mainSlice';
import CustomTypography from '../constant/CustomTypography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import Pageable from './pageable/Pageable';

const CombineTables = ({ open, closeModal }) => {
    const [targetTable, setTargetTable] = useState('');
    const [selectedTableId, setSelectedTableId] = useState(null);
    const dispatch = useDispatch();

    const mainFilters = useSelector(state => state.main.filters);
    const currentTableId = mainFilters.tableSelected;
    const listTable = useSelector(state => state.main.data.allTables);
    const listTableBusy = listTable.filter(table => table.status === "BUSY" && table.id !== currentTableId);
    const table = listTable.find(table => table.id === currentTableId);
    const currentTableTitle = table ? table.title : '';

    const pageSize = 12;
    const totalItems = listTableBusy.length;

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const itemsOnPage = listTableBusy.slice(startIndex, endIndex + 1);

    const handlePageChange = (pageNumber) => {
        console.log(pageNumber + 1);
        setCurrentPage(pageNumber + 1);
    };

    const handleClick = (targetTable) => {
        setTargetTable(targetTable);
        setSelectedTableId(targetTable.id);
    };

    const handleCombineTables = (currentTableId, targetTableId) => {
        Swal({
            title: `Bạn chắc chắn muốn gộp ${currentTableTitle} với ${targetTable.title}?`,
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            buttons: ["Hủy", "Gộp"],
            dangerMode: true,
        }).then((willSwitch) => {
            if (willSwitch) {
                dispatch(combineTables({ currentTableId, targetTableId }));
                closeModal();
                dispatch(loadTableOrder({
                    page: mainFilters.tableOrders.page,
                    size: mainFilters.tableOrders.size,
                    search: mainFilters.search,
                    totalPages: mainFilters.tableOrders.totalPages
                })).then(() => {
                    dispatch(mainSlice.actions.setTableTitle(targetTable.title));
                    dispatch(mainSlice.actions.setTableSelected(targetTable.id));
                }).then(() => {
                    mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(targetTable.id));
                    Swal({
                        title: "Thành công!",
                        text: "Gộp bàn thành công!",
                        icon: "success",
                        timer: 1500
                    });
                })
            }
        });
    };

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h3' className='App'>Gộp bàn</DialogTitle>
            <DialogTitle variant='h4'>
                Bàn hiện tại: {currentTableTitle}
            </DialogTitle>
            <DialogTitle variant='h5'>
                Vui lòng chọn bàn để gộp bàn
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: "700px", height: "500px" }}>
                    <Box sx={{ width: "700px", height: "500px" }}>
                        <Grid container spacing={2} sx={{ maxWidth: "100%", margin: "0 5px" }}>
                            {listTableBusy.length > 0 ? (
                                itemsOnPage.map((item) => (
                                    <Grid item xs={6} sm={3} md={2.8} mb={2} key={"table" + item.id}>
                                        <Card sx={{ backgroundColor: selectedTableId === item.id ? purple[100] : "inherit", textAlign: "center", borderRadius: "25%" }}>
                                            <CardActionArea onClick={() => handleClick(item)}>
                                                <CardContent>
                                                    <LocalCafeIcon />
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.zone.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <CustomTypography variant="body2" sx={{ marginTop: "15%", textAlign: "center", width: "100%" }}>
                                    <Typography variant="h3">Không tìm thấy bàn phù hợp</Typography>
                                </CustomTypography>
                            )}
                            <Pageable page={currentPage} setPage={handlePageChange} totalPage={Math.ceil(totalItems / pageSize)} />
                        </Grid>
                    </Box>
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
                        onClick={() => handleCombineTables(currentTableId, targetTable.id)}
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