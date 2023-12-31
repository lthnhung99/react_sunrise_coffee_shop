/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY, TAKE_AWAY } from '../../constant/AppConstant';
import CustomTypography from '../../constant/CustomTypography';
import Pageable from '../pageable/Pageable';
import { purple, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import Swal from 'sweetalert';
import mainSlice, { getListOrderDetailByTableId, loadTableOrder, splitProduct } from '../reducers/mainSlice';
import TransferList from './TransferList';
import { ToastifyError, ToastifyInfo, ToastifySuccess } from '../toastify/Toastify';

const SeparateTables = ({ open, closeModal }) => {
    const dispatch = useDispatch();
    const [targetTable, setTargetTable] = useState('');
    const [selectedTableId, setSelectedTableId] = useState('');
    const [selectedZone, setSelectedZone] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [filteredTables, setFilteredTables] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openListOrder, setOpenListOrder] = useState(false);
    const [productSplit, setProductSplit] = useState([]);
    const pageSize = 12;

    const mainFilters = useSelector((state) => state.main.filters);
    const currentTableId = mainFilters.tableSelected;
    const listTable = useSelector(state => state.main.data.allTables);
    const listTableEmpty = listTable.filter(table => table.status === EMPTY);
    const zoneTitles = [...new Set(listTableEmpty?.map((item) => item.zone.title))].filter((title) => title !== TAKE_AWAY);
    const table = listTable.find(table => table.id === currentTableId);
    const currentTableTitle = table ? table.title : '';

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber + 1);
    };

    const handleClick = (targetTable) => {
        setTargetTable(targetTable);
        setSelectedTableId(targetTable.id);
        setProductSplit([]);
        setOpenListOrder(true);
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

    const handleSplitTables = (sourceTableId, targetTableId, products) => {
        if (products.length > 0) {
            Swal({
                title: `Bạn chắc chắn muốn tách ${currentTableTitle} sang ${targetTable.title}?`,
                text: "Hành động này sẽ không thể hoàn tác!",
                icon: "warning",
                buttons: ["Hủy", "Tách"],
                dangerMode: true,
            }).then((willSplit) => {
                if (willSplit) {
                    closeModal();
                    dispatch(splitProduct({ sourceTableId, targetTableId, products }))
                        .unwrap()
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
                            ToastifySuccess('Tách bàn thành công!');
                        })
                        .catch(() => {
                            ToastifyInfo("Vui lòng chọn chức năng chuyển bàn!");
                        })
                }
            });
        } else {
            ToastifyError('Bạn chưa chọn số lượng để tách!');
        }
    };

    const handleOpenTransferList = () => {
        setOpenListOrder(true);
    }

    const handleCloseTransferList = () => {
        // productSplit.length <= 0 && setSelectedTableId('');
        setOpenListOrder(false);
    }

    return (
        <Dialog open={open} onClose={closeModal}>
            <DialogTitle variant='h3' className='textCenter'>Tách bàn</DialogTitle>
            <DialogTitle variant='h4'>
                Bàn hiện tại: {currentTableTitle}
            </DialogTitle>
            <DialogTitle variant='h5'>
                Vui lòng chọn bàn để tách bàn
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
            {openListOrder && <TransferList
                open={handleOpenTransferList}
                closeModal={handleCloseTransferList}
                currentTableTitle={currentTableTitle}
                targetTableTitle={targetTable.title}
                setProductSplit={setProductSplit} />}
            <DialogActions>
                <Box style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        className='buttonModalBill'
                        size="large"
                        variant="contained"
                        startIcon={<ChangeCircleIcon />}
                        disableElevation
                        onClick={() => handleSplitTables(currentTableId, targetTable.id, productSplit)}
                        disabled={!selectedTableId}
                    >
                        Tách bàn
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

export default SeparateTables;