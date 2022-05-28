import * as React from 'react';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';


import { AppBar, Container, Icon, IconButton, Toolbar, useMediaQuery, Box, Grid } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Cardabout() {

  const modoCelularPequenito = useMediaQuery('(max-width:768px)');
  const modoCelularPequenito2 = useMediaQuery('(max-width:1680px)');


  return (
    <div>
      <Box sx={{
        height: "70vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 30px',
        position: 'relative',
        zIndex: '1',


      }}>
        <Box sx={{
          position: "absolute",
          backgroundImage: "url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700388521.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover, contain",
          backgroundPositionY: modoCelularPequenito2 ? '- 50px' : '-250px',

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
          marginTop: modoCelularPequenito ? '-200px' : '-80px',
        }}>
          <Container sx={{
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'row',

          }}>

            <Typography variant='h3' sx={{
              marginTop: '0px',
              textAlign: 'center',
              maxWidth: '600px',
              fontSize: '20px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#E0F80E',



            }}>Sobre nós
            </Typography>






          </Container>

          <Typography variant='h1' sx={{
            textAlign: 'center',
            fontWeight: '700',
            maxWidth: modoCelularPequenito ? '500px' : '650px',
            fontSize: modoCelularPequenito ? "25px" : '35px',
          }}>

            Somos a equipe de desenvolvimento da plataforma perfeita para esportistas.





          </Typography>

        </Container>
      </Box>
      <Box sx={{

        height: '70vh',
      }}>
        <Container sx={{
          marginTop:'5rem',
        }}>
        <Typography sx={{
          color: '#E0F80E',
          fontWeight: 'bold',
          fontSize: '30px',

        }}>Nossa Companhia</Typography>
        <Typography sx={{

        }}>sexo sexo tesão piazão demonio pinto pau pinto yukio pintudo</Typography>
        </Container>
        <Container sx={{
          marginTop:'5rem',
        }}>

          <Grid container spacing={3}>
            <Grid item xs="auto">
              <Item>pinto</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>xs=6</Item>
            </Grid>
            <Grid item xs>
              <Item>xs</Item>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </div>
  );
}
export default Cardabout
