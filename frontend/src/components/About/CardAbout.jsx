import * as React from 'react';

import Typography from '@mui/material/Typography';

import { Container, useMediaQuery, Box } from '@mui/material'
import AboutUsCards from './AboutDataInsert'
import { Nicolas, Luiz, Tiago } from './data'
import { ImgAboutWrapper } from './AboutElements';

function CardAbout() {

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
              fontSize: '30px',
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
            maxWidth: modoCelularPequenito ? '500px' : '1550px',
            fontSize: modoCelularPequenito ? "25px" : '50px',
          }}>

            Somos a equipe de desenvolvimento da plataforma perfeita para esportistas.





          </Typography>

        </Container>
      </Box>
      <Box sx={{

        height: '70vh',
      }}>
        <Container sx={{
          marginTop: '5rem',
        }}>
          <Typography sx={{
            color: '#E0F80E',
            fontWeight: 'bold',
            fontSize: '30px',

          }}>Nosso time</Typography>
          <Typography sx={{

          }}>Conheça quem está por trás desse projeto</Typography>
        </Container>
        <Container sx={{
          height: modoCelularPequenito ? '1200px' : '460px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItens: 'center',
       

        }}>
          <ImgAboutWrapper>
            <AboutUsCards {...Nicolas}></AboutUsCards>
            <AboutUsCards {...Luiz}></AboutUsCards>
            <AboutUsCards {...Tiago}></AboutUsCards>
          </ImgAboutWrapper>
        </Container>
      </Box>

    </div>
  );
}
export default CardAbout
