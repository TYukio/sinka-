import { AppBar, Container, Grid, Icon, Button } from "@mui/material";
import { display, height } from "@mui/system";
import { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { fakeComponentAlert } from '../../../util/miscmethods';
import { SessionContext } from '../../../util/contexts';

function Sidebar({ isOpen, toggle }) {

    const session_uid = useContext(SessionContext);

    const Icon = styled(Grid)({
        position: 'absolute',
        top: '1.2rem',
        right: '1.5rem',
        background: 'transparent',
        fontSize: '2rem',
        cursor: 'pointer',
        outline: 'none',

    })
    const LinkRes = styled(Link)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        textDecoration: 'none',
        transition: '0.2s ease-in-out',
        color: '#fff',
        
        cursor: 'pointer',
        margin: '20vh auto',
        fontWeight:'600',
        textTransform:'uppercase',
        '&:hover':
            {color:"#6C0097"}
            




    })

    return (
        <AppBar isOpen={isOpen} onClick={toggle} sx={{
            position: 'fixed',
            zIndex: '999',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            top: '0',
            left: '0',
            transition: '0.3s ease-in-out',
            opacity: isOpen ? '100%' : '0%',
            top: isOpen ? '0%' : '-100%',

        }}>
            <Icon >
                <CloseIcon onClick={toggle} sx={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.5rem',
                    background: 'transparent',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    outline: 'none',
                }} />
            </Icon>
            <Grid sx={{
                color: "#fff",
            }}>
                <Grid sx={{
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: 'repeat(6, 80px)',
                    textAlign: 'center',
                }}>
                    <LinkRes to='/sobre' onClick={toggle}>Sobre</LinkRes>

                    <LinkRes to='#' onClick={fakeComponentAlert}>Descobrir</LinkRes>

                    <LinkRes to='#' onClick={fakeComponentAlert}>Serviços</LinkRes>

                    { session_uid == null ?
                    <LinkRes to='/entrar' onClick={toggle}>Login</LinkRes>
                    :
                    <></>
                    }
                </Grid>

            </Grid>

            
            <Grid  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                <Button href='/registre-se' variant="contained" sx={{
                    justifyContent: 'center',
                    borderRadius: '50px',
                    padding: '8px 32px',
                    fontSize: '1rem',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'no-wrap',


                }}>{session_uid == null ? 'Cadastro' : 'Meu perfil'}</Button>
            </Grid>


        </AppBar>
    )
}


export default Sidebar
