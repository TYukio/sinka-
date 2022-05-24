import { useState, useContext } from 'react';
import { Stack, Collapse, Typography, Divider, Button, IconButton, useTheme, useMediaQuery, Box } from '@mui/material';
import { Home, Person, Logout, Login, DoubleArrowRounded } from '@mui/icons-material';
import { SessionContext } from '../../util/contexts';

function Dashboard(props) {
    const theme = useTheme();
    const mobile = useMediaQuery('(max-aspect-ratio: 6/5)');
    const [expanded, setExpanded] = useState(false);

    const session_uid = useContext(SessionContext);

    const additionalbuttons = Array.isArray(props.buttons) ? props.buttons : [];
    const defaultbuttons = [
        {label: 'home', icon: <Home />, href: '/'},
    ]
    
    if (session_uid !== null)
    {
        defaultbuttons.push({label: 'meu perfil', icon: <Person />, href: '/user/' + session_uid});
    }
        
    const dashbuttons = props.useDefault === true ?  defaultbuttons.concat(additionalbuttons) : additionalbuttons;

    return (
        <Box sx={{flexShrink: 0, position: 'relative', width: mobile ? 'none' : '14rem'}}>
            <Stack direction="row" sx={{position: 'absolute', zIndex: 256, height:'100%', minHeight: '100vh'}}>  
                <Collapse in={expanded || !mobile} orientation="horizontal">
                    <Stack direction="column" sx={{backgroundColor: theme.palette.background.overlay, height: '100%', width: '14rem', alignItems: 'center', justifyContent: 'flex-start'}} spacing={2}>
                        <Typography fontWeight="bold" variant="h6" letterSpacing={'0.1rem'} component="div" sx={{marginBottom: '-1.5rem'}}>
                            <p>DASHBOARD</p>
                        </Typography>

                        <Divider sx={{width: '80%'}} orientation="horizontal" />
                        {
                            dashbuttons.map((btn, i) =>
                            {
                                if (btn.href == null)
                                    return (
                                        <Box width="80%" display="inline-flex" alignItems="center">
                                            <Typography sx={{marginRight: '1em', opacity: '75%', textTransform: 'upperCase', fontSize: '0.8em'}}>
                                                {btn.label}
                                            </Typography>
                                            <Divider textAlign="left" sx={{flexGrow: 1, alignContent: 'center', padding: '-2em'}}/>
                                        </Box>

                                    );
                                else
                                    return(
                                        <Button href={btn.href} color="neutral" sx={{width: '80%', height: '3rem', my: '-2em'}} startIcon={btn.icon}>
                                            {btn.label}
                                        </Button>
                                    );
                            })
                        }

                        <Stack direction="column-reverse" sx={{pb: '1em', flexGrow: 1, alignItems: 'center', width: '100%'}}>

                            <Button href={session_uid !== null ? '/auth/signout' : '/entrar'} color="neutral" sx={{width: '80%', height: '3rem'}} startIcon={session_uid !== null ? <Logout color="error" /> : <Login color="success" />}>
                                {session_uid !== null ? 'Sair' : 'Entrar'}
                            </Button>

                        </Stack>

                    </Stack>
                    
                </Collapse>

                <IconButton disableRipple={true} aria-label="dashboard" size="large" onClick={() => setExpanded(!expanded)} sx={{borderRadius: 0, display: mobile ? 'auto' : 'none'}}>
                    <DoubleArrowRounded sx={{transition: '0.25s', transform: expanded ? 'rotate(-180deg)': 'none'}} />
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Dashboard;