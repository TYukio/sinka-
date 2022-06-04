import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Divider, Fab, Chip, Icon, Container, Button, useMediaQuery, Grid } from '@mui/material';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';

import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import { Add, Search, Toys } from '@mui/icons-material';
import defaultbanner from './defaultbanner.png'
import Teamprofile from './ac-milan-logo-0.png'
function Team(props) {
    const [userdata, setUserdata] = useState();
    const navigate = useNavigate()
    const params = useParams();
    const theme = useTheme();

    const session_uid = useContext(SessionContext);
    const profile_uid = params.id;

    const [userTypes, setUserTypes] = useState([]);
    const [sports, setSports] = useState([]);

    // Backend
    const hostname = useContext(HostContext);
    const mobile = useMediaQuery('(max-width:920px)');
    function fetchUserdata() {
        if (profile_uid === null)
            return;

        fetch(hostname + 'userdata/fetchpublic?id=' + profile_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => setUserdata(json));
            } else if (response.status === 404) {
                navigate('/team');
            }
        });
    }

    function fetchDatafields() {
        fetch(hostname + 'datafields/usertypes', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => {
                    setUserTypes(json);
                });
            }
        });

        fetch(hostname + 'datafields/sports', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => {
                    setSports(json);
                });
            }
        });
    }

    /*eslint-disable */
    useEffect(() => { fetchUserdata(); fetchDatafields(); }, []);
    /*eslint-enable */

    if (userdata) {
        return (


            <Box height="100%" width="100%" display="flex">
                <Dashboard sx={{ position: 'fixed' }} useDefault={true}></Dashboard>

                <Stack direction="column" sx={{
                    padding: '2rem',
                    paddingTop: '1em',
                    flexGrow: 1,
                    overflowWrap: 'break-all',
                    alignItems: 'center'
                }}>



                    <Typography sx={{
                        marginBottom: '1em',
                        fontSize: '2em',
                        fontWeight: '700'
                    }}>TEAM PAGE</Typography>


                    <Box sx={{

                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: '40px',
                        alignItems: 'center',
                        maxWidth: '1900px',

                    }}>
                        <Typography sx={{
                            fontSize: "1.25rem",
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5em',
                            justifyContent: 'initial',
                        }}>
                            Esportes
                        </Typography>

                        <Typography sx={{ marginTop: '-1em', textAlign: 'center', display: (userdata.sports && userdata.sports.length > 0) ? 'none' : 'auto' }} fontSize="0.965rem" component="div" letterSpacing="0.02em">
                            Nenhum esporte por aqui
                        </Typography>


                        <Box sx={{ minWidth: '100%', flexWrap: 'wrap', gap: mobile ? '0rem' : '1em', display: 'flex', fontSize: '2.125rem', justifyContent: 'initial', letterSpacing: '0.06em', mb: '1em' }}>
                            {Object.keys(userdata.sports).map((key, i) => {
                                if (sports === null || sports === undefined || sports.length === 0)
                                    return (undefined);
                                const curtype = sports.find(element => element.id === userdata.sports[key]);
                                return (
                                    <Button variant='contained' color="primary" disabled sx={{
                                        fontSize: mobile ? '0.5em' : '0.5em',
                                        margin: mobile ? '0.5em' : 'none',

                                        flexWrap: 'unset',

                                    }}>
                                        {curtype.title}
                                        <Icon >{curtype.mui_icon}</Icon>
                                    </Button>


                                );
                            })}
                        </Box>
                        <Box sx={{
                            display:'flex',
                            justifyContent:'center',
                            gap:'5rem',
                            flexWrap:'wrap',
                        }}>
                            <Stack direction={'collumn'}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    marginTop: mobile ? '2em' : 'none',
                                }}>

                                <Box sx={{
                                    height: '100%',
                                    minHeight: mobile ? '40rem' : '30rem',
                                    maxWidth: '20rem',
                                    minWidth: '20rem',
                                    width: '100%',

                                    marginBottom: mobile ? '0' : '2em',
                                    margin: 'auto',
                                    justifyContent: 'center',
                                    background: theme.palette.background.box,
                                    borderRadius: '20px',

                                }}>
                                    <Box sx={{
                                        backgroundImage: `url(${defaultbanner})`,
                                        width: 'calc(100%)',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        backgroundSize: 'cover',
                                        borderRadiusTop: '20px',
                                        height: '15vh',
                                        alignItems: 'center',
                                        display: 'relative',
                                        flexDirection: 'column'
                                    }}></Box>
                                    <Stack direction={'collumn'} sx={{
                                        justifyContent: 'center',
                                    }}>
                                        <Avatar
                                            alt='Milan'
                                            src={Teamprofile}
                                            sx={{

                                                justifyContent: 'center',
                                                marginTop: '-3em',
                                                height: '10rem',
                                                width: '10rem',
                                                borderRadius: '50%',
                                                background: theme.palette.background.box,
                                                border: 1,
                                                borderColor: theme.palette.background.overlay
                                            }}></Avatar>
                                    </Stack>
                                    <Stack sx={{
                                        display: 'flex',
                                        justifyContent:  'center' ,
                                        margin: '0' ,
                                        width: '100%',
                                        marginTop: '0' ,
                                        alignText: 'center',
                                        flex: 'wrap',

                                    }}>
                                        <Typography sx={{
                                            display: 'flex',
                                            justifyContent:'center',
                                            fontSize: '1.8em',
                                            fontWeight: '600',


                                            textTransform: 'uppercase',
                                        }}> A.C MILAN B
                                        </Typography>
                                        <Typography sx={{
                                            display: 'flex',
                                            justifyContent: 'center' ,
                                            color: theme.palette.neutral.dark,
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            alignText: 'center',
                                            marginTop:  '0' ,
                                            marginRight:  '0' ,


                                        }}>
                                            Participantes: 10/10
                                        </Typography>

                                    </Stack>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        margin: 'auto',

                                    }}>
                                        <Button variant='contained' href='/team/1' sx={{
                                            borderRadius: '50px',
                                            height: '4rem',
                                            width: '12rem',
                                            fontSize: '1.2rem',
                                            marginTop: '5rem',
                                            backgroundColor: "#E0F80E",
                                            color: '#000',
                                            fontWeight: '600',
                                            '&:hover':
                                                { color: "white" }

                                        }}>Visitar Página</Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', fontSize: '0.725rem', alignItems: 'center', letterSpacing: '0.06em', marginLeft: '2px', marginTop: '10%' }}>
                                        <p>Criado desde</p>
                                        <Typography fontWeight="bold" component="div" sx={{ marginLeft: '0.35em', fontSize: '0.725rem', marginTop: '1px', }}>
                                            <p>{userdata.creation.substr(0, 10).split('-').reverse().join('/')}</p>

                                        </Typography>


                                    </Box>
                                </Box>
                            </Stack>
                            <Stack direction={'collumn'}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    marginTop: mobile ? '2em' : 'none',
                                }}>

                                <Box sx={{
                                    height: '100%',
                                    minHeight: mobile ? '40rem' : '30rem',
                                    maxWidth: '20rem',
                                    minWidth: '20rem',
                                    width: '100%',

                                    marginBottom: mobile ? '0' : '2em',
                                    margin: 'auto',
                                    justifyContent: 'center',
                                    background: theme.palette.background.box,
                                    borderRadius: '20px',

                                }}>
                                    <Box sx={{
                                        backgroundImage: `url(${defaultbanner})`,
                                        width: 'calc(100%)',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        backgroundSize: 'cover',
                                        borderRadiusTop: '20px',
                                        height: '15vh',
                                        alignItems: 'center',
                                        display: 'relative',
                                        flexDirection: 'column'
                                    }}></Box>
                                    <Stack direction={'collumn'} sx={{
                                        justifyContent: 'center',
                                    }}>
                                        <Avatar
                                            alt='Milan'
                                            src={Teamprofile}
                                            sx={{

                                                justifyContent: 'center',
                                                marginTop: '-3em',
                                                height: '10rem',
                                                width: '10rem',
                                                borderRadius: '50%',
                                                background: theme.palette.background.box,
                                                border: 1,
                                                borderColor: theme.palette.background.overlay
                                            }}></Avatar>
                                    </Stack>
                                    <Stack sx={{
                                        display: 'flex',
                                        justifyContent:  'center' ,
                                        margin: '0' ,
                                        width: '100%',
                                        marginTop: '0' ,
                                        alignText: 'center',
                                        flex: 'wrap',

                                    }}>
                                        <Typography sx={{
                                            display: 'flex',
                                            justifyContent:'center',
                                            fontSize: '1.8em',
                                            fontWeight: '600',


                                            textTransform: 'uppercase',
                                        }}> A.C MILAN B
                                        </Typography>
                                        <Typography sx={{
                                            display: 'flex',
                                            justifyContent: 'center' ,
                                            color: theme.palette.neutral.dark,
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            alignText: 'center',
                                            marginTop:  '0' ,
                                            marginRight:  '0' ,


                                        }}>
                                            Participantes: 10/10
                                        </Typography>

                                    </Stack>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        margin: 'auto',

                                    }}>
                                        <Button variant='contained' href='/team/1' sx={{
                                            borderRadius: '50px',
                                            height: '4rem',
                                            width: '12rem',
                                            fontSize: '1.2rem',
                                            marginTop: '5rem',
                                            backgroundColor: "#E0F80E",
                                            color: '#000',
                                            fontWeight: '600',
                                            '&:hover':
                                                { color: "white" }

                                        }}>Visitar Página</Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', fontSize: '0.725rem', alignItems: 'center', letterSpacing: '0.06em', marginLeft: '2px', marginTop: '10%' }}>
                                        <p>Criado desde</p>
                                        <Typography fontWeight="bold" component="div" sx={{ marginLeft: '0.35em', fontSize: '0.725rem', marginTop: '1px', }}>
                                            <p>{userdata.creation.substr(0, 10).split('-').reverse().join('/')}</p>

                                        </Typography>


                                    </Box>
                                </Box>
                            </Stack>

                            
                        </Box>
                    </Box>
                    <Fab href="/" color="primary" aria-label="edit" sx={{
                        position: 'fixed', bottom: '3rem', right: '3rem', zIndex: 255,

                    }}>
                        <Search />
                    </Fab>
                    <Fab href="/criartime" color="primary" aria-label="edit" sx={{
                        position: 'fixed', bottom: '3rem', left: mobile ? '3rem' : '15rem', zIndex: 255,

                    }}>
                        <Add />
                    </Fab>
                </Stack>
            </Box >








        )

    }
}



export default Team