import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Home from './pages/Home';
import Signup from './pages/authpages/Signup';
import Signin from './pages/authpages/Signin';
import { purple } from '@mui/material/colors';

const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	  primary:
	  {
		  main: purple[400]
	  }
	},
});

function App() {
  	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} /> 
					<Route path="/registre-se" element={<Signup />} />
					<Route path="/entrar" element={<Signin />} /> 
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
