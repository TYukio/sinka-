import styled from "styled-components";

export const ImgAboutWrapper = styled.div`

max-width: 100%;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
align-items: center;
grid-gap: 30px;
padding: 0 0px;

@media screen and (max-width: 1000px){
    grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 768px){
    grid-template-columns: 1fr;
    
}
`
export const AboutCard = styled.div`
background: #0f0f0f;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
textAlign: initial;
border-radius: 10px;
padding: 30px;
box-shadow: 0 1px 2px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;
height: 360px;
width: 300px;
border: 3px solid #222;
&:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor:pointer;
}
`
export const AboutIcon = styled.div`
height: 100px;
width 100px;
margin-bottom: 40px;
`

export const ImgAbout = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
    border-radius:100%;
`