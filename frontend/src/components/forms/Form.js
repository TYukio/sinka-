import { Container, Icon, Divider, Stack, useTheme } from '@mui/material';

import logo from './sinka.svg'

function Form(props) { 
    const theme = useTheme();
    return (
        <>
            <Icon sx={{ m: '1rem', fontSize: '5rem' }}>
                <img alt="" src={logo} style={{height: '100%'}}/>
            </Icon>
            <Container sx={{bgcolor: theme.palette.grey[900], textAlign:'center', width:'25rem', borderRadius:'4px' }}>
                <h2 style={{letterSpacing: '0.075em'}}>{props.title}</h2>
                <Divider />
                <Stack marginY={'1em'} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={'1em'}>
                    {props.children}
                </Stack>
            </Container>
        </>
    );
}

export default Form;