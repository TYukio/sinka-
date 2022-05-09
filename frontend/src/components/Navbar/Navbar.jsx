import { AppBar, Button, Container, Grid, Icon, useMediaQuery } from '@mui/material'
import React from 'react'
import logo from './sinka.svg'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { Translate } from '@mui/icons-material';
import { display } from '@mui/system';
import styled from '@emotion/styled';


function Navbar({ toggle }) {
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
        fontWeight:'600',
        textTransform:'uppercase',
        letterSpacing:'1px',
        '&.active': {
            borderBottom: '3px solid #fff'
        },
        '&:hover':
            { color: "#6C0097" }

    });

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
                    <Icon sx={{
                        color: '#fff',
                        justifySelf: 'flex-start',
                        cursor: 'pointer',
                        fontSize: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '24px',
                    }}>
                        <img alt="" onClick={toggle} src={logo} style={{ height: '100%' }} />
                    </Icon>
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
                            <LinkNav to='/'>
                                Sobre
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav to='/'>
                                Descobrir
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav to='/'>
                                Serviços
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight: '500'
                        }}>
                            <LinkNav href='/entrar'>
                                Login
                            </LinkNav>
                        </Grid>

                    </Grid>
                    <Button href='/registre-se' variant="contained" sx={{
                        display: modoCelularPequenito ? 'none' : 'flex',
                        alignItems: 'center',
                        listStyle: 'none',
                        textAlign: 'center',
                        textTransform: 'none',
                        borderRadius: '50px',
                        textTransform:'uppercase',

                    }}>Cadastro</Button>
                </Container>
            </AppBar>
        </>
    );
}


export default Navbar
