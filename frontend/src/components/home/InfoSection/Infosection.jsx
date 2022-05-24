import { Avatar, Button, Container, createTheme, Grid, Icon, Typography, useMediaQuery } from "@mui/material";
import { Box, color } from "@mui/system";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from "@emotion/styled";
import React from 'react'
import { AddBoxSharp } from "@mui/icons-material";
import { InfoRow, Column1, Column2, Img, InfoContainer, InfoWrapper, TextWrapper, ImgWrap } from "./InfoElements";

const Infosection = ({ lightBg, id, imgStart, Topline, Heading, Subtitle, buttonLabel, img, alt, lightText, darkText,  }) => {
    const modoCelularPequenito = useMediaQuery('(max-width:768px)');

    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper >
                    <InfoRow imgStart={imgStart} >
                        <Column1>
                            <TextWrapper>
                                <Typography className='Topline' sx={{
                                    color: "#E0F80E",
                                    fontWeight: '700',
                                    letterSpacing: '1.4px',
                                    textTransform: 'uppercase',
                                    marginBottom: '16px',
                                    fontSize: '16px',

                                }}>{Topline}</Typography>
                                <Typography lightText={lightText} className='Heading' sx={{
                                    marginBottom: '24px',
                                    lineHeight: '1.1',
                                    fontWeight: '600',
                                    color: 'lightText',
                                    fontSize: modoCelularPequenito ? '32px' : '48px',


                                }}>{Heading}</Typography>
                                <Typography darkText={darkText} className='Subtitle' sx={{
                                    maxWidth: '440px',
                                    marginBottom: '35px',
                                    fontSize: '18px',
                                    lineHeight: '24px',
                                    color: 'darktext',

                                }}>{Subtitle}</Typography>

                                <Button href='/registre-se' variant="contained" sx=
                                    {{
                                        backgroundColor: "#E0F80E",
                                        color: '#000',
                                        fontWeight: '600',
                                        display: 'flex',
                                        height: '3rem',
                                        marginTop: '32px',
                                        borderRadius: '50px',
                                        width: '210px',
                                        minWidth: '64px',

                                        '&:hover':
                                            { color: "white" }
                                    }}>
                                    {buttonLabel} <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>

                            </TextWrapper>
                        </Column1>
                        <Column2 >
                            <ImgWrap>
                                <Img src={img} alt={alt}>
                                </Img>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default Infosection