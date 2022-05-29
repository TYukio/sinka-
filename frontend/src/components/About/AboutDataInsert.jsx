import React from 'react'
import { ImgAboutWrapper, AboutCard, AboutIcon, ImgAbout } from './AboutElements';
import Typography from '@mui/material/Typography';


const AboutDataInsert = ({ img, alt, Topline, Subtitle, Name }) => {

    return (
        


            
                <AboutCard>
                    <AboutIcon>
                        <ImgAbout src={img} alt={alt}>
                        </ImgAbout>
                    </AboutIcon>
                    <Typography className='Topline' sx={{
                        color: "#E0F80E",
                        fontWeight: '700',
                        letterSpacing: '1.4px',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                        fontSize: '16px',

                    }}>{Topline}</Typography>
                    <Typography>{Name}</Typography>
                    
                    <Typography className='Subtitle' sx={{
                        maxWidth: '440px',
                        marginBottom: '35px',
                        fontSize: '18px',
                        lineHeight: '24px',
                        color: 'darktext',

                    }}>{Subtitle}</Typography>

                </AboutCard>

            
        
    )
}

export default AboutDataInsert