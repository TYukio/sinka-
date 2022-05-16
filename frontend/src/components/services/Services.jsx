import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Box, useMediaQuery } from "@mui/material";
import Img4 from './img-4.svg'
import Img5 from './img-5.svg'
import Img6 from './img-6.svg'

import Typography from '@mui/material/Typography';
import { ServicesWrapper, ServicesContainer, ServicesCard, ServicesIcon } from './ServicesElements';

const Services = () => {
    const modoCelularPequenito = useMediaQuery('(max-width:480px)');

    return (
    <ServicesContainer id="serviços">
        <Container sx={{
            maxWidth: '540px',
            paddingTop: '0',
            paddingBottom: '40px',
            
        }}>
        <Typography variant="h1" sx={{
            fontSize:'3rem',
            
            margin: '2rem',
            fontWeight: '700',
            textAlign: 'center',
           
        }}>Nossos Serviços</Typography>
        </Container >
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={Img4}></ServicesIcon>
                <Typography  sx={{
                    color: '#fff',
                    marginBottom: "30px",
                    fontSize: modoCelularPequenito ? '1.5rem' : '2rem',
                }}>Seus Recordes</Typography>
                <Typography sx={{
                    fontSize: '1rem',
                    marginBottom: '10px',

                }}>Participe de campeonatos e amistosos para construir um perfil de atleta. Quebre seus recordes!
                </Typography>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Img5}></ServicesIcon>
                <Typography sx={{
                    color: '#fff',
                    marginBottom: "30px",
                    fontSize: modoCelularPequenito ? '1.5rem' : '2rem',
                }}>Personalize</Typography>
                <Typography sx={{
                    fontSize: '1rem',
                    marginBottom: '10px',

                }}>Para profissionais da área, tenha 100% de edições para deixar seu perfil com a cara do seu trabalho.
                </Typography>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Img6}></ServicesIcon>
                <Typography sx={{
                    color: '#fff',
                    marginBottom: "30px",
                    fontSize: modoCelularPequenito ? '1.5rem' : '2rem',
                }}>Sua Conta</Typography>
                <Typography sx={{
                    fontSize: '1rem',
                    marginBottom: '10px',

                }}>Escolha seus esportes, encontre amigos e participe do Sinka para aproveitar todas as funcionalidades da plataforma
                </Typography>
            </ServicesCard>
        </ServicesWrapper>
    </ServicesContainer >
  );

}
export default Services