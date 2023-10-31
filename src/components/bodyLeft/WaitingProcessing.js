import { Box } from '@mui/material'
import React from 'react'
import CustomTabs from '../headerLeft/CustomTabs'

export default function WaitingProcessing() {
    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <CustomTabs value={"value"} />
            </Box>
        </Box>
    )
}
