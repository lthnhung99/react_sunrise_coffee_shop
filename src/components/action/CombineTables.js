/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { combineProducts, combineTables, getAllTableOrder, getListOrderDetailByTableId, loadTableOrder } from '../reducers/mainSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { purple, red } from '@mui/material/colors';
import Swal from 'sweetalert';
import mainSlice from '../reducers/mainSlice';
import CustomTypography from '../../constant/CustomTypography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import Pageable from '../pageable/Pageable';
import { BUSY, TAKE_AWAY } from '../../constant/AppConstant';
import { ToastifySuccess } from '../toastify/Toastify';

const CombineTables = ({ open, closeModal }) => {
    const dispatch = useDispatch();
    const [selectedTableIds, setSelectedTableIds] = useState([]);
    const [selectedZone, setSelectedZone] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [filteredTables, setFilteredTables] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCheckbox, setSelectedCheckbox] = useState(false);
    const pageSize = 12;

    const mainFilters = useSelector(state => state.main.filters);
    const currentTableId = mainFilters.tableSelected;
    const listTable = useSelector(state => state.main.data.allTables);
    const listTableBusy = listTable.filter(table => table.status === BUSY && table.id !== currentTableId);
    const zoneTitles = selectedCheckbox
        ? [...new Set(listTable?.map((item) => item.zone.title))].filter((title) => title !== TAKE_AWAY)
        : [...new Set(listTableBusy?.map((item) => item.zone.title))].filter((title) => title !== TAKE_AWAY);
    const table = listTable.find(table => table.id === currentTableId);
    const currentTableTitle = table ? table.title : '';

    useEffect(() => {
        if (open) {
            dispatch(getAllTableOrder());
        }
    }, [open]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber + 1);
    };

    const handleClick = (targetTable) => {
        const tableId = targetTable.id;
        setSelectedTableIds((prevSelectedTableIds) => {
            if (prevSelectedTableIds.includes(tableId)) {
                return prevSelectedTableIds.filter((id) => id !== tableId);
            } else {
                return [...prevSelectedTableIds, tableId];
            }
        });
    };

    useEffect(() => {
        let totalItems = 0;
        let filtered;
        if (selectedCheckbox) {
            filtered = listTable;
            if (selectedZone !== "") {
                setCurrentPage(1);
                filtered = listTable.filter(table => table.zone.title === selectedZone);
            };
        } else {
            filtered = listTableBusy;
            if (selectedZone !== "") {
                setCurrentPage(1);
                filtered = listTableBusy.filter(table => table.zone.title === selectedZone);
            };
        };

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        const itemsOnPage = filtered.slice(startIndex, endIndex + 1);

        if (selectedCheckbox) {
            if (selectedZone === "") {
                totalItems = listTable.length;
            } else {
                totalItems = itemsOnPage.length;
            };
        } else {
            if (selectedZone === "") {
                totalItems = listTableBusy.length;
            } else {
                totalItems = itemsOnPage.length;
            };
        }

        setFilteredTables(itemsOnPage);
        setTotalPages(Math.ceil(totalItems / pageSize));
    }, [selectedZone, currentPage, selectedCheckbox]);

    useEffect(() => {
        console.log(selectedCheckbox);
    }, [selectedCheckbox])

    const handleCombineTables = (currentTableIds, targetTableId) => {
        Swal({
            title: `Bạn chắc chắn muốn gộp ${selectedTableIds.length} bàn với ${currentTableTitle}?`,
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            buttons: ["Hủy", "Gộp"],
            dangerMode: true,
        }).then((willCombine) => {
            if (willCombine) {
                closeModal();

                if (selectedCheckbox) {
                    dispatch(combineTables({ currentTableIds, targetTableId }));
                } else {
                    dispatch(combineProducts({ currentTableIds, targetTableId }));
                };

                dispatch(mainSlice.actions.setTableSelected(targetTableId))
                mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(targetTableId));
                dispatch(loadTableOrder({
                    page: mainFilters.tableOrders.page,
                    size: mainFilters.tableOrders.size,
                    search: mainFilters.search,
                    totalPages: mainFilters.tableOrders.totalPages
                }));
                ToastifySuccess('Gộp bàn thành công!');
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
                Vui lòng chọn một hoặc nhiều bàn để gộp bàn
            </DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: "10px" }}>
                    <FormControl component="fieldset">
                        <ButtonGroup
                            aria-label="floor"
                            name="floor"
                            value={selectedZone}
                            variant="outlined"
                            sx={{
                                flexDirection: "row",
                                "& .MuiButton-root": {
                                    borderRadius: "10px"
                                }
                            }}
                        >
                            <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                onClick={() => setSelectedZone("")}
                                variant={selectedZone === "" ? "contained" : "outlined"}
                            >
                                Tất cả
                            </Button>
                            {zoneTitles.sort().map((title) => (
                                <Button style={{ marginRight: "10px", borderRight: "solid 1px" }}
                                    key={title}
                                    onClick={() => setSelectedZone(title)}
                                    variant={selectedZone === title ? "contained" : "outlined"}
                                >
                                    {title}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </FormControl>
                </Box>
                <Box sx={{ width: "700px", height: "500px" }}>
                    <Box sx={{ width: "700px", height: "500px" }}>
                        <Grid container spacing={2} sx={{ maxWidth: "100%", margin: "0 5px" }}>
                            {filteredTables.length > 0 ? (
                                filteredTables.map((item) => (
                                    <Grid item xs={6} sm={3} md={2.8} mb={2} key={"table" + item.id}>
                                        <Card
                                            sx={{
                                                backgroundColor: selectedTableIds.includes(item.id)
                                                    ? purple[100]
                                                    : "inherit",
                                                textAlign: "center",
                                                borderRadius: "25%",
                                            }}
                                        >
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
                            <Pageable page={currentPage} setPage={handlePageChange} totalPage={totalPages} />
                        </Grid>
                    </Box>
                </Box>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onClick={() => setSelectedCheckbox(!selectedCheckbox)} />}
                        label={
                            <Typography variant="h5">
                                Gộp thành nhiều bàn
                            </Typography>
                        } />
                </FormGroup>
            </DialogContent>
            <DialogActions >
                <Box style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="large"
                        variant="contained"
                        startIcon={<CallMergeIcon />}
                        disableElevation
                        onClick={() => handleCombineTables(selectedTableIds, currentTableId)}
                        disabled={selectedTableIds.length === 0}
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