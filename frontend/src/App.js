import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createContext } from 'react';

import { SessionContext } from './util/contexts';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

import Notfound from './pages/Notfound';
import Home from './pages/Home';
import Signup from './pages/authpages/Signup';
import Signin from './pages/authpages/Signin';
import User from './pages/profiles/User';
import UserEdit from './pages/profiles/UserEdit';

const themes = {
	dark: createTheme({
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
	}),

	light: createTheme({
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
	})
}

function App() {
	const [cookies] = useCookies(['token'])
	const { decodedToken } = useJwt(cookies.token);
	const session_uid = (decodedToken !== null) ? decodedToken.uid : null;

	createContext(session_uid);

  	return (
		<ThemeProvider theme={themes.dark}>
			<CssBaseline />
			<Router>
				<SessionContext.Provider value={session_uid}>
					<Routes>
						<Route path="/" element={<Home />} /> 
						<Route path="/registre-se" element={<Signup />} />
						<Route path="/entrar" element={<Signin />} />
						<Route path="/user/:id" element={<User />} />
						<Route path="/editarperfil" element={<UserEdit />} />
						<Route path="*" element={<Notfound />} /> 
					</Routes>
				</SessionContext.Provider>
			</Router>
		</ThemeProvider>
	);
}

export default App;
