import { Container, Grid, Icon, Link, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import logo from './sinka.svg'
import { Sidebar, Logo } from './styled'
const sidebar = () => {
    return (
        <Sidebar>
            <Logo>
                <img src={logo}></img>
                <Typography sx={{
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                }}>SINKABOARD</Typography>

            </Logo>
            <Container sx={{
                background: 'transparent',
                borderRadius: '10px',
                margin: '8px 0',

            }}>
                <Grid sx={{
                    display: 'flex',
                }}>
                    <PersonIcon sx={{
                    }}></PersonIcon>
                    <Link sx={{
                        textDecoration:'None',
                        color: 'inherit',
                        fontSize:'16px',
                        padding: '2px',
                    }}>Perfil</Link>
                    
                </Grid>
                <Grid sx={{
                    display: 'flex',
                }}>
                    <PersonIcon sx={{
                    }}></PersonIcon>
                    <Link sx={{
                        textDecoration:'None',
                        color: 'inherit',
                        fontSize:'16px',
                        padding: '2px',
                    }}>Perfil</Link>
                    
                </Grid>
                <Grid sx={{
                    display: 'flex',
                }}>
                    <PersonIcon sx={{
                    }}></PersonIcon>
                    <Link sx={{
                        textDecoration:'None',
                        color: 'inherit',
                        fontSize:'16px',
                        padding: '2px',
                    }}>Perfil</Link>
                    
                </Grid>
            </Container>
        </Sidebar>
    )
}

export default sidebar