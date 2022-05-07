import { useTheme, Box, Stack, Avatar, Typography, Divider } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../../components/profiles/Dashboard';
import Loading from '../../components/Loading';

import defaultbanner from './defaultbanner.jpg'

import { useEffect, useState } from 'react';

function User(props) {
	const [userdata, setUserdata] = useState(null);
	const navigate = useNavigate()
	const params = useParams();
	const theme = useTheme();

    // Backend
    function fetchUserdata()
    {
        fetch('/userdata/fetchpublic?id=' + params.id, {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => setUserdata(json));
            } else if (response.status === 404) {
                navigate('/user');
            } 
        });
    }

	/*eslint-disable */
	useEffect(() => {fetchUserdata();}, []);
	/*eslint-enable */

	if (userdata !== null)
	{
		return (
			<Box sx={{width:'100vw', display: 'flex'}}>
				<Dashboard useDefault={true} />

				<Stack direction="column" sx={{padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>
					
					<Box sx={{backgroundImage: `url(${defaultbanner})`, maxWidth: '1920px', width: 'calc(100% + 4rem)', marginX: '-4rem',
						alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
						<Avatar alt="Usuário" src="" sx={{ width: '6em', height: '6em', marginY: '0.25em', border: '0.12em solid' }}/>

						<Typography fontWeight="bold" variant="h4" component="div" sx={{marginY: '-2rem', color: theme.palette.common.white}}>
							<p>{userdata.full_name}</p>
						</Typography>
					</Box>

					<CalendarMonth sx={{margin: '1rem 0 -0.5rem 0'}}/>
					<Box sx={{display: 'flex', flexDirection: 'row', fontSize: '1.125rem', alignItems: 'center', letterSpacing: '0.06em'}}>
						<p>Membro desde</p>
						<Typography fontWeight="bold" component="div" sx={{marginLeft: '0.35em'}}>
							<p>{userdata.creation.substr(0, 10).split('-').reverse().join('/')}</p>
						</Typography>
					</Box>	

					<Divider sx={{width: '16rem'}} />

					<Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
						<p>Sobre</p>
					</Typography>

					<Typography component="div" sx={{textAlign: 'center', minWidth: '20rem', width: '50%', backgroundColor: theme.palette.background.overlay, padding: '0em 1em'}}>
						<p>{userdata.biography !== null ? userdata.biography : 'Este usuário não adicionou sua biografia'}</p>
					</Typography>

				</Stack>
			</Box>
		);
	}
	else return (
		<Loading />
	)
}

export default User;
