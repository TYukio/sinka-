import { Box } from '@mui/system';
import React from 'react'
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
const createteam = () => {
    return (
        <Box height="100%" width="100%" display="flex">
            <Dashboard sx={{ position: 'fixed' }} useDefault={true}></Dashboard>
        </Box>
    )
}

export default createteam