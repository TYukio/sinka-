import React from 'react'
import { AboutCard, AboutIcon, ImgAbout } from './AboutElements';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material'



const AboutDataInsert = ({ img, alt, Topline, Name, Hobbies }) => {

    return (

        <AboutCard>


            <AboutIcon>
                <ImgAbout src={img} alt={alt}>
                </ImgAbout>
            </AboutIcon>
            <Container sx={{
                width:'100%'
            }}>
                <Typography sx={{
                    fontSize: '1em',
                    textTransform: 'uppercase',


                }}>{Name}</Typography>
                <Typography sx={{
                    justifyContent: 'initial',
                    color: "#E0F80E",
                    fontWeight: '700',
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    fontSize: '16px',



                }}>{Topline}</Typography>



                <Typography sx={{
                    maxWidth: '440px',
                    marginTop: '15px',
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: 'darktext',

                }}>{Hobbies}</Typography>
            </Container>
        </AboutCard >



    )
}

export default AboutDataInsert