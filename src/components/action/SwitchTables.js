/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeAllProductToNewTable, getAllTableOrder, getListOrderDetailByTableId, loadTableOrder } from '../reducers/mainSlice';
import { purple, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Swal from 'sweetalert';
import CustomTypography from '../../constant/CustomTypography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import mainSlice from '../reducers/mainSlice';
import Pageable from '../pageable/Pageable';
import { EMPTY, TAKE_AWAY } from '../../constant/AppConstant';
import { ToastifySuccess } from '../toastify/Toastify';

const SwitchTables = ({ open, closeModal }) => {
    const dispatch = useDispatch();
    const [targetTable, setTargetTable] = useState('');
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedZone, setSelectedZone] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [filteredTables, setFilteredTables] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    const mainFilters = useSelector((state) => state.main.filters);
    const currentTableId = mainFilters.tableSelected;
    const listTable = useSelector(state => state.main.data.allTables);
    const listTableEmpty = listTable.filter(table => table.status === EMPTY);
    const zoneTitles = [...new Set(listTableEmpty?.map((item) => item.zone.title))].filter((title) => title !== TAKE_AWAY);
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
        setTargetTable(targetTable);
        setSelectedTableId(targetTable.id);
    };

    useEffect(() => {
        let totalItems = 0;
        let filtered = listTableEmpty;
        if (selectedZone !== "") {
            setCurrentPage(1);
            filtered = listTableEmpty.filter(table => table.zone.title === selectedZone);
        };

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        const itemsOnPage = filtered.slice(startIndex, endIndex + 1);

        if (selectedZone === "") {
            totalItems = listTableEmpty.length;
        } else {
            totalItems = itemsOnPage.length;
        };

        setFilteredTables(itemsOnPage);
        setTotalPages(Math.ceil(totalItems / pageSize));
    }, [selectedZone, currentPage]);

    const handleSwitchTables = (oldTableId, newTableId) => {
        Swal({
            title: `Bạn chắc chắn muốn chuyển ${currentTableTitle} sang ${targetTable.title}?`,
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            buttons: ["Hủy", "Chuyển"],
            dangerMode: true,
        }).then((willSwitch) => {
            if (willSwitch) {
                closeModal();
                dispatch(changeAllProductToNewTable({ oldTableId, newTableId }))
                    .then(() => {
                        dispatch(mainSlice.actions.setTableTitle(targetTable.title));
                        dispatch(mainSlice.actions.setZoneTitle(targetTable.zone.title));
                        dispatch(mainSlice.actions.setTableSelected(targetTable.id));
                    }).then(() => {
                        mainFilters.tableSelected && dispatch(getListOrderDetailByTableId(targetTable.id));
                        dispatch(loadTableOrder({
                            page: mainFilters.tableOrders.page,
                            size: mainFilters.tableOrders.size,
                            search: mainFilters.search,
                            totalPages: mainFilters.tableOrders.totalPages
                        }));
                        ToastifySuccess('Chuyển bàn thành công!');
                    })
            }
        });
    };

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h3' className='textCenter'>Chuyển bàn</DialogTitle>
            <DialogTitle variant='h4'>
                Bàn hiện tại: {currentTableTitle}
            </DialogTitle>
            <DialogTitle variant='h5'>
                Vui lòng chọn bàn để chuyển bàn
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
                    <Grid container spacing={2} sx={{ maxWidth: "100%", margin: "0 5px" }}>
                        {filteredTables.length > 0 ? (
                            filteredTables.map((item) => (
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
                        <Pageable page={currentPage} setPage={handlePageChange} totalPage={totalPages} />
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="large"
                        variant="contained"
                        startIcon={<ChangeCircleIcon />}
                        disableElevation
                        onClick={() => handleSwitchTables(currentTableId, targetTable.id)}
                        disabled={!selectedTableId}
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