import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useTheme, Container, Icon, Divider, Stack, Alert } from '@mui/material';
import { SessionContext } from '../../util/contexts';

import logo from './sinka.svg'

function Form(props) { 
    const theme = useTheme();

    const session_uid = useContext(SessionContext);

    if (props.profileOnSession === true && session_uid !== null)
        return (<Navigate to={'/user/' + session_uid} />);
    else
        return (
            <>
                <Icon sx={{ m: '1rem', fontSize: '5rem' }}>
                    <img alt="" src={logo} style={{height: '100%'}}/>
                </Icon>

                <Container sx={{bgcolor: theme.palette.background.overlay, textAlign:'center', width:'25rem', borderRadius:'4px' }}>
                    <h2 style={{letterSpacing: '0.075em'}}>{props.title}</h2> 
                    
                    <Alert sx={{mb: '1em', display: (props.alert !== undefined && props.alert !== 'undefined') ? 'auto' : 'none' }} severity={(props.alertseverity !== undefined) ? props.alertseverity : 'info'} variant="filled">
                        {props.alert}
                    </Alert>
                    
                    <Divider />
                    <Stack marginY={'1em'} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={'1em'} overflow={'hidden'}>
                        {props.children}
                    </Stack>

                </Container>
            </>
        );
}

export default Form;