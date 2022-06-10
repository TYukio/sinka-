import React from 'react'
import { Box, Icon, Typography, Chip, Stack } from '@mui/material'
const Cardlocal = (props) => {
    return (

        <Box sx={{
            
            margin: '1em',
            justifyContent: 'center',
            minWidth: '20em',
            width: '40em',
        }}>
            <Box  sx={{
                backgroundImage:'url(' + props.image + ')',
                backgroundSize:'cover',
                minHeight: '14em',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',

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


            </Box>
        </Box>


    )
}

export default Cardlocal