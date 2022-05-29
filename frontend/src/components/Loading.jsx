import { Box, CircularProgress } from '@mui/material';

function Loading(props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <CircularProgress size="5em" />
        </Box>
    );
}

export default Loading;