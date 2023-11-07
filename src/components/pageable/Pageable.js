import { Pagination } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Pageable = ({ page, setPage, totalPage }) => {

    const mainFilters = useSelector((state) => state.main.filters);
    const onPageChange = (event, pageChange) => {
        if (pageChange < 0 || pageChange > mainFilters.totalPages) {
            return;
        }
        setPage(pageChange - 1);
    };

    const handleFirstPage = () => {
        if (page !== 0) {
            setPage(0);
        }
    };

    const handleLastPage = () => {
        if (page !== mainFilters.totalPages - 1) {
            setPage(mainFilters.totalPages - 1);
        }
    };

    return (
        <div style={{ position: "absolute", bottom: "5%", left: "35%" }}>
            <Pagination
                count={mainFilters.totalPages}
                page={page}
                onChange={onPageChange}
                boundaryCount={1}
                showFirstButton
                showLastButton
                siblingCount={1}
                onFirstPageClick={handleFirstPage}
                onLastPageClick={handleLastPage}
                color="primary"
            />
        </div>
    );
};

export default Pageable;