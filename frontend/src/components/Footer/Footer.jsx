import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useMediaQuery } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sinka
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  const modoCelularPequenito = useMediaQuery('(max-width:768px)');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: modoCelularPequenito ? '10vh' : "auto",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Todos os direitos reservados 2022
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
