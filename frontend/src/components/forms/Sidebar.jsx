import { AppBar, Container, Grid, Icon, Button} from "@mui/material";
import { display, height } from "@mui/system";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";



function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);


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
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        textDecoration: 'none',
        transition:'0.2s ease-in-out',
        color:'#fff',
        cursor:'pointer',
        margin:'20vh auto'
        



    })
    const Sidebar = ({ isOpen, toggle }) => {
    return (
        <AppBar isOpen={isOpen} onClick={toggle} sx={{
            position: 'fixed',
            zIndex: '999',
            width: '100%',
            height: '100%',
            background: '#0d0d0d',
            display: 'grid',
            top: '0',
            left: '0',
            transition: '0.3s ease-in-out',
            opacity: isOpen ? '100%' : '0%',
            top: isOpen ? '0%' : '-100%',

        }}>
            <Icon onClick={toggle}>
                <CloseIcon sx={{
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
                color:"#fff",
            }}>
                <Grid sx={{
                    height:'100%',
                    display:'grid',
                    gridTemplateColumns:'1fr',
                    gridTemplateRows:'repeat(6, 70px)',
                    textAlign:'center',
                }}>
                    <LinkRes to='/'>About</LinkRes>

                    <LinkRes to='/'> CoCO</LinkRes>

                    <LinkRes to='/'>XIXI</LinkRes>

                    <LinkRes to='/'> Login</LinkRes>
                </Grid>

            </Grid>
            <Grid sx={{display:'flex', alignItems:'center',justifyContent:'center',}} >
            <Button variant="contained" sx={{
                justifyContent:'center',
                borderRadius:'50px',
                padding:'8px 32px',
                fontSize:'1rem',
                outline:'none',
                border:'none',
                cursor:'pointer',
                whiteSpace:'no-wrap',
        

        }}>Cadastro</Button>
            </Grid>


        </AppBar>
    )
    }
}

export default Sidebar
