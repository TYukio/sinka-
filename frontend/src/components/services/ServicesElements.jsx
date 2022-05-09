import styled from 'styled-components'

export const ServicesContainer = styled.div`
    height: 960px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-itens: center;
    background: black;
    
    

    @media screen and (max-width:768px){
        
        height: 1500px;
        
    }

    @media screen and (max-width: 480px){
        height: 1300px;
       
        
    }

`

export const ServicesWrapper = styled.div`

    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 50px;
    padding: 0 0px;

    @media screen and (max-width: 1000px){
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`
export const ServicesCard = styled.div`
    background: #121212;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;

    &:hover{
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor:pointer;
    }
    `
export const ServicesIcon = styled.img`
    height: 160px;
    width 160px;
    margin-bottom: 10px;
`