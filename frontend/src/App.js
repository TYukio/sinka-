import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Notfound from './pages/Notfound';
import Home from './pages/Home';
import Signup from './pages/authpages/Signup';
import Signin from './pages/authpages/Signin';
import User from './pages/profiles/User';

const theme_dark = createTheme({
	palette: {
		mode: 'dark',

		primary:
		{
			main: '#8e34b3'
		},

		neutral:
		{
			main: '#dddddd',
			light: '#ffffff',
			dark: '#cccccc',
			contrastText: 'rgba(0, 0, 0, 0.87)'
		},
		
		background:
		{
			overlay: '#222222'
		}
	},
});

const theme_light = createTheme({
	palette: {
		mode: 'light',

		primary:
		{
			main: '#8e34b3'
		},

		neutral:
		{
			main: '#808080',
			light: '#gggggg',
			dark: '#707070',
			contrastText: 'rgba(0, 0, 0, 0.87)'
		},
		
		background:
		{
			overlay: '#eeeeee'
		}
	},
});

function App() {
  	return (
		<ThemeProvider theme={theme_dark}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} /> 
					<Route path="/registre-se" element={<Signup />} />
					<Route path="/entrar" element={<Signin />} />
					<Route path="/user/:id" element={<User />} />
					<Route path="*" element={<Notfound />} /> 
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
