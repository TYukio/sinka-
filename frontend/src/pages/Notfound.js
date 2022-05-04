import { Stack, Typography, Button, Fade } from '@mui/material';
import { useState } from 'react';
import CountUp from 'react-countup';

function Notfound() {
    const [countFinished, setCountFinished] = useState(false);

    return (
        <>
            <Stack sx={{ width: '100%', textAlign: 'center' }} alignItems="center">
                <Typography mt="2rem" fontWeight="bold" variant="h1" component="div">
                    <CountUp onEnd={() => setCountFinished(true)} start={300} end={404} duration={1.75} useEasing />
                </Typography>

                <Fade in={countFinished}>
                    <Typography variant="h6" fontSize={'1em'} component="div">
                        <p>Você provavelmente digitou algo errado, mister</p>
                        <Button href="/" variant="outlined">Voltar pra casa</Button>
                    </Typography>
                </Fade>

            </Stack>
        </>
    );
}
  
export default Notfound;
  