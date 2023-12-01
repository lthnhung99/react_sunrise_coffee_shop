import { Typography, styled } from "@mui/material";

const CustomTypography = styled(Typography)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        fontSize: "10rem",
        color: "#69b1ff70",
        defaultProps: {
            variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'span',
                body2: 'span',
            },
        },
    },
}));

export default CustomTypography;