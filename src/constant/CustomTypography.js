import { Typography, styled } from "@mui/material";

const CustomTypography = styled(Typography)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        fontSize: "10rem",
        color: "#69b1ff70"
    },
}));

export default CustomTypography;