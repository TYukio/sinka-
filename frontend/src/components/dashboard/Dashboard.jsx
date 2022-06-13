import { useState, useContext } from 'react';
import { Stack, Collapse, Typography, Divider, Button, IconButton, useTheme, useMediaQuery, Box } from '@mui/material';
import { HomeOutlined, PersonOutline, Logout, Login, DoubleArrowRounded, WorkspacesOutlined, GroupsOutlined, PlaceOutlined      } from '@mui/icons-material';
import { SessionContext } from '../../util/contexts';
import logo from './sinka.svg';
import scrollbar from './scrollbar.css'

function Dashboard(props) {
    const theme = useTheme();
    const mobile = useMediaQuery('(max-width:768px)');
    const [expanded, setExpanded] = useState(false);

    const session_uid = useContext(SessionContext);

    const additionalbuttons = Array.isArray(props.buttons) ? props.buttons : [];
    const defaultbuttons = [
        { label: 'Navegue' },
        { label: 'Home', icon: <HomeOutlined />, href: '/' },
        { label: 'Sobre', icon: <WorkspacesOutlined />, href: '/sobre' },
        { label: 'Descobrir' },
        { label: 'Quadras', icon: <PlaceOutlined />, href: '/courts/'  },
        { label: 'Equipes', icon: <GroupsOutlined />, href: '/myteam/'  }
    ]

    if (session_uid !== null) {
        defaultbuttons.push({ label: 'Meu Sinka' });
        defaultbuttons.push({ label: 'Perfil', icon: <PersonOutline />, href: '/user/' + session_uid });   
    }

    const dashbuttons = props.useDefault === true ? defaultbuttons.concat(additionalbuttons) : additionalbuttons;

    return (
       
            <Box sx={{ flexShrink: 0, position: 'relative', width: mobile ? 'none' : '13rem', backgroundColor: theme.palette.background.overlay, height: '100vh', overflowY: 'auto'  }}>
                <Stack direction="row" sx={{ position: 'fixed', zIndex: 256, height:  mobile ? '100%' : "100vh", overflowY: 'auto' }}>
                    <Collapse in={expanded || !mobile} orientation="horizontal" sx={{
                        overflowY: 'scroll',
                        display: 'flex',
                        backgroundColor: theme.palette.background.overlay,
                    }}>
                        <Stack direction="column" sx={{ backgroundColor: theme.palette.background.overlay, width: '13rem', justifyContent: 'flex-start', height: '100%' }} spacing={2}>
                            <Box sx={{ height: '2.8em', marginTop: '1em', textAlign: 'center',  }}><img alt="" src={logo} style={{ height: '100%' }} ></img></Box>

                            {
                                dashbuttons.map((btn, i) => {
                                    if (btn.href == null)
                                        return (
                                            <Box key={i} width="100%" display="inline-flex" alignItems="center" >
                                                <Typography sx={{ marginX: '1em', opacity: '75%', textTransform: 'upperCase', fontSize: '0.8em',    }}>
                                                    {btn.label}
                                                </Typography>
                                                <Divider textAlign="center" sx={{ flexGrow: 1, alignContent: 'center', padding: '-2em' }} />
                                            </Box>

                                        );
                                    else
                                        return (
                                            <Button key={i} href={btn.href} color="neutral" sx={{ width: '100%', height: '2.5rem', my: '-2em', justifyContent: 'flex-start', paddingLeft: '1.5em', marginTop:'2px' }} startIcon={btn.icon}>
                                                {btn.label}
                                            </Button>
                                        );
                                })
                            }

                            <Stack direction="column-reverse" sx={{ pb: '1em', flexGrow: 1, width: '100%' }}>

                                <Button href={session_uid !== null ? '/auth/signout' : '/entrar'} color="neutral" sx={{ width: '100%', height: '3rem' }} startIcon={session_uid !== null ? <Logout color="error" /> : <Login color="success" />}>
                                    {session_uid !== null ? 'Sair' : 'Entrar'}
                                </Button>

                            </Stack>

                        </Stack>

                    </Collapse>

                    <IconButton disableRipple={true} aria-label="dashboard" size="large" onClick={() => setExpanded(!expanded)} sx={{ borderRadius: 0, display: mobile ? 'auto' : 'none' }}>
                        <DoubleArrowRounded sx={{ transition: '0.25s', transform: expanded ? 'rotate(-180deg)' : 'none' }} />
                    </IconButton>
                </Stack>
            </Box>

        
    );
}

export default Dashboard;