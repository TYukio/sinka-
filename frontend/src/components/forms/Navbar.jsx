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


function Navbar() {
    const modoCelularPequenito = useMediaQuery('(max-width:768px)');
    const LinkNav = styled(Link)({
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0 1.5rem',
        height: '100%',
        cursor: 'pointer',
        '&.active': {
            borderBottom: '3px solid #fff'
        }
    });
    const Navbar = ({ toggle }) =>{
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
                        <img alt="" src={logo} style={{ height: '100%' }} />
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
                            fontWeight:'500'
                        }}>
                            <LinkNav to='/'>
                                About
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight:'500'
                        }}>
                            <LinkNav to='/'>
                                About
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight:'500'
                        }}>
                            <LinkNav to='/'>
                                About
                            </LinkNav>
                        </Grid>
                        <Grid sx={{
                            height: '80px',
                            fontWeight:'500'
                        }}>
                            <LinkNav to='/'>
                                About
                            </LinkNav>
                        </Grid>

                    </Grid>
                    <Button variant="contained" sx={{
                        display: modoCelularPequenito ? 'none' : 'flex',
                        alignItems: 'center',
                        listStyle: 'none',
                        textAlign: 'center',
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderRadius: '50px',
                    }}>Cadastro</Button>
                </Container>
            </AppBar>
        </>
    );
                }
}

export default Navbar
