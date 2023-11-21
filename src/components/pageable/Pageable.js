import { Pagination } from '@mui/material';
import React from 'react';

const Pageable = ({ page, setPage, totalPage }) => {

    const onPageChange = (event, pageChange) => {
        if (pageChange < 0 || pageChange > totalPage) {
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
        if (page !== totalPage - 1) {
            setPage(totalPage - 1);
        }
    };

    return (
        <div style={{ position: "absolute", bottom: "8%", left: "30%" }}>
            <Pagination
                count={totalPage}
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