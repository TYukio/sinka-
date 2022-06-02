import { AppBar, Button, Container, Grid, Icon, useMediaQuery, Avatar, Typography, Box } from '@mui/material'
import { React, useContext, useEffect, useState } from 'react'
import logo from './sinka.svg'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { Translate } from '@mui/icons-material';
import { display } from '@mui/system';
import { fakeComponentAlert } from '../../../util/miscmethods';
import { SessionContext, HostContext } from '../../../util/contexts';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

function Navbar({ toggle }) {
    const [userdata, setUserdata] = useState(null);

    const session_uid = useContext(SessionContext);
    const hostname = useContext(HostContext);
    const navigate = useNavigate();

    const modoCelularPequenito = useMediaQuery('(max-width:768px)');
    const LinkNav = styled(Link)({
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0 2rem',
        height: '100%',
        cursor: 'pointer',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        '&.active': {
            borderBottom: '3px solid #fff'
        },
        '&:hover':
            { color: "#6C0097" }

    });

    function fetchUserdata()
    {
		if (session_uid === null)
            return;

        fetch(hostname + 'userdata/fetchpublic?id=' + session_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => {
                    setUserdata(json);
                });
            }
        });
    }

    useEffect(fetchUserdata, [session_uid]);

    return (
        <>
            <AppBar sx={{
                background: '#000',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1rem',
                position: 'sticky',
                top: '0',
                zIndex: '10',
                width: '100%',

            }}>
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '80px',
                    zIndex: '1',
                    width: '100%',
                    padding: '20px',
                    maxWidth: '1100px',

                }}>
                    <LinkNav href='/' sx={{

                        color: '#fff',

                        justifySelf: 'flex-start',

                        cursor: 'pointer',

                        fontSize: '3rem',

                        display: 'flex',

                        alignItems: 'center',

                        marginLeft:modoCelularPequenito ? '-10px' : '24px',

                        marginTop: modoCelularPequenito ? '5px' : 'none',
                    }}>


                        <img alt="" src={logo} style={{ height: '100%' }} />

                    </LinkNav>
                    <DehazeIcon onClick={toggle} sx={{
                        display: modoCelularPequenito ? 'block' : 'none',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        transform: 'translate(-100%, 60%)',
                        fontSize: '2.5rem',
                        cursor: 'pointer',
                    }}></DehazeIcon>
                    <Grid sx={{
                        display: modoCelularPequenito ? 'none' : 'flex',
                        alignItems: 'center',
                        listStyle: 'none',
                        textAlign: 'center',


                    }} >
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav href ='/sobre'> 
                                Sobre
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav onClick={fakeComponentAlert}>
                                Descobrir
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav onClick={fakeComponentAlert}>
                                Serviços
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500',
                            display: session_uid != null ? 'none' : 'auto'
                        }}>
                            <LinkNav href='/entrar'>
                                Login
                            </LinkNav>
                        </Grid>

                    </Grid>
                    {

                        userdata == null ? 
                        <Button href='/registre-se' variant="contained" sx={{
                            display: modoCelularPequenito ? 'none' : 'flex',
                            alignItems: 'center',
                            listStyle: 'none',
                            textAlign: 'center',
                            textTransform: 'none',
                            borderRadius: '50px',
                            textTransform: 'uppercase',
                        }}>Cadastro</Button>
                        : 
                        <Box display="inline-flex">
                            <Typography alignSelf={'center'} sx={{display: modoCelularPequenito ? 'none' : 'flex'}} marginRight="0.6em" fontWeight="bold" letterSpacing="0.05em">{userdata.full_name}</Typography>
                            <Avatar onClick={() => navigate('/user/' + session_uid) } src={hostname + `images/pfp/${session_uid}.jpg?${new Date().valueOf()}`} sx={{
                                cursor: 'pointer',
                                display: modoCelularPequenito ? 'none' : 'flex',
                                width: '2em',
                                height: '2em',
                                marginY: '0.25em',
                                border: '0.12em solid',
                                alignSelf: 'center'
                            }} />  
                        </Box>
                    }

                </Container>
            </AppBar>
        </>
    );
}


export default Navbar
