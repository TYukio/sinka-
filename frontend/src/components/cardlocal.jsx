import React from 'react'
import { useContext } from 'react';
import { Box, Icon, Typography, Chip, Fab } from '@mui/material'
import LocalPlaceholder from '../pages/courts/courtplaceholder.jpg'
import { DeleteForeverOutlined } from '@mui/icons-material'
import { HostContext } from '../util/contexts';

const Cardlocal = (props) => {
    const hostname = useContext(HostContext);

    function deleteCourtdata()
    {
        fetch(hostname + 'courtdata/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_court: props.id
            })
        }).then(response => {
            if (response.ok) { 
                props.refreshCallback();
            }
            // TODO checagem de erros mínima
        });
    }

    return (

        <Box sx={{
            
            margin: '1em',
            justifyContent: 'center',
            minWidth: '20em',
            width: '40em',
            transition: '0.2s',
            '&:hover': {transform: 'scale(1.05)', transition: '0.2s'}
        }}>
            <Box  sx={{
                backgroundImage:'url(' + LocalPlaceholder + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
                minHeight: '14em',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                '&:before': {
                    backgroundImage: 'url(' + props.image + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover',
                    position: 'absolute',
                    content: '""',
                    width: '40em',
                    height: '14em',
                    borderTopLeftRadius: '1em',
                    borderTopRightRadius: '1em',
                    pointerEvents: 'none'
                }

            }}>

            </Box>
            <Box sx={{
                background: '#000',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                minHeight: '15em',
                padding: '1em'
            }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '2.5em',

                    letterSpacing: '2px',
                }}>{props.title}</Typography>
                <Typography sx={{
                    color: '#555',
                    fontSize: '1em',
                    textTransform: 'uppercase',

                }}>{props.subtitle}</Typography>
                <Box sx={{
                    marginTop: '1em',
                }}> 
                    <Chip color="primary" icon={<Icon>{props.sport.mui_icon}</Icon>} label={props.sport.title} />
                </Box>
                <Typography sx={{
                    
                    marginTop: '1em',
                    fontSize: '1.2em',
                    textTransform: 'uppercase',
                    
                }}><b>Endereço: </b>{props.address}</Typography>

                    <Fab onClick={() => {if (window.confirm("Tem certeza que deseja remover este local esportivo?")) deleteCourtdata(); }} color="primary" aria-label="edit" sx={{
                        position: 'relative', left: '33rem' , bottom: '1rem', zIndex: 255, display: (props.id !== null && props.id ? 'auto' : 'none')
                    }}>
                        <DeleteForeverOutlined />
					</Fab>

            </Box>
        </Box>


    )
}

export default Cardlocal