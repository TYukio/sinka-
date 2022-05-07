import { useState } from 'react';
import { Stack, Collapse, Typography, Divider, Button, IconButton, useTheme, useMediaQuery, Box } from '@mui/material';
import { Home } from '@mui/icons-material';

import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';

function Dashboard(props) {
    const theme = useTheme();
    const mobile = useMediaQuery('(max-aspect-ratio: 6/5)');
    const [expanded, setExpanded] = useState(false);
    
    const additionalbuttons = Array.isArray(props.buttons) ? props.buttons : [];
    const defaultbuttons = [
        {label: 'home', icon: <Home />, href: '/'}
    ]

    const dashbuttons = props.useDefault === true ?  defaultbuttons.concat(additionalbuttons) : additionalbuttons;

    return (
        <Box sx={{flexShrink: 0, position: 'relative', width: mobile ? 'none' : '14rem', height: '100vh'}}>
            <Stack direction="row" sx={{position: 'absolute', zIndex: 256}}>  
                <Collapse in={expanded || !mobile} orientation="horizontal">
                    <Stack sx={{backgroundColor: theme.palette.background.overlay, height: '100vh', width: '14rem', alignItems: 'center'}} spacing={2}>
                        <Typography fontWeight="bold" variant="h6" letterSpacing={'0.1rem'} component="div" sx={{marginBottom: '-1.5rem'}}>
                            <p>DASHBOARD</p>
                        </Typography>

                        <Divider sx={{width: '80%'}} orientation="horizontal" />
                        {
                        dashbuttons.map((btn, i) =>
                            <Button href={btn.href} color="neutral" sx={{width: '80%', height: '3rem', my: '-2em'}} startIcon={btn.icon}>
                                {btn.label}
                            </Button>
                        )}

                    </Stack>
                    
                </Collapse>

                <IconButton disableRipple={true} aria-label="dashboard" size="large" onClick={() => setExpanded(!expanded)} sx={{borderRadius: 0, display: mobile ? 'auto' : 'none'}}>
                    <DoubleArrowRoundedIcon sx={{transition: '0.25s', transform: expanded ? 'rotate(-180deg)': 'none'}} />
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Dashboard;