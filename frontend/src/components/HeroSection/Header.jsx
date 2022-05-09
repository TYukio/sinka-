import { AppBar, Button, Container, Icon, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import React from 'react'
import { Link } from 'react-router-dom'
import logo from './sinka.svg'
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/system';


import { useEffect, useRef, useState } from "react";


const Navbar = () => {
    const modoCelularPequenito = useMediaQuery('(max-width:768px)');


    

    return (
        <Box sx={{
            height: "95vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 30px',
            position: 'relative',
            zIndex: '1',


        }}>
            <Box sx={{
                position: "absolute",
                backgroundImage: "url('https://wallpaperaccess.com/full/7927699.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                
                top: '0',
                right: '0',
                left: '0',
                bottom: '0',
                width: '100%',
                overflow: 'hidden',

            }}>
            </Box>
            <Container sx={{
                zIndex: '3',
                maxWidth: '1200px',
                position: 'absolute',
                padding: '8px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Container sx={{
                    maxWidth: '1200px',
                    display: modoCelularPequenito ? 'none'  : 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'row',
                }}>

                    <Typography variant='h3' sx={{
                        marginTop: '64px',
                        textAlign: 'center',
                        maxWidth: '600px',
                        fontSize: '28px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',



                    }}>O Site Perfeito Para
                    </Typography>
                    <Typography

                        sx={{
                            marginTop: '59px',
                            paddingLeft: '10px',
                            textAlign: 'center',
                            maxWidth: '600px',
                            fontSize: "28px",
                            fontWeight: '500',
                            color: "#E0F80E",
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}>Atletas </Typography>


                </Container>

                <Typography variant='h1' sx={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: modoCelularPequenito ? "40px" : '78px',
                }}>

                    Crie sua conta e descubra o esporte a sua volta.






                </Typography>
                <Button href='/registre-se' variant="contained" sx=
                    {{
                        backgroundColor: "#E0F80E",
                        color: '#000',
                        fontWeight: '600',
                        display: 'flex',
                        height: '3rem',
                        marginTop: '32px',
                        borderRadius: '50px',
                        width:'210px',
                        minWidth:'64px',

                        '&:hover':
                            { color: "white" }
                    }}>
                    Comece agora <ArrowForwardIcon></ArrowForwardIcon>
                </Button>
            </Container>
        </Box>


    )
}


export default Navbar;
