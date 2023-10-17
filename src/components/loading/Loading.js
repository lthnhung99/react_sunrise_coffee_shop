import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
    return (
        <Box sx={{
            position: "absolute",
            top: "50%",
            right: "65%",
            width: "100px",
            height: "100px",
            transform: "translate(-50%, -50%)",
        }}>
            <CircularProgress />
        </Box>
    );
};

Loading.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel() {
    const [progress, setProgress] = React.useState(10);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return <Loading value={progress} />;
}