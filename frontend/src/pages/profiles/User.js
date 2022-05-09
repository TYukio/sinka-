import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Divider, Fab, Chip, Icon } from '@mui/material';
import { CalendarMonth, Edit } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext } from '../../util/contexts';
import Dashboard from '../../components/profiles/Dashboard';
import Loading from '../../components/Loading';

import defaultbanner from './defaultbanner.jpg'

function User(props) {
	const [userdata, setUserdata] = useState();
	const navigate = useNavigate()
	const params = useParams();
	const theme = useTheme();

	const session_uid = useContext(SessionContext);
	const profile_uid = params.id;

	const [userTypes, setUserTypes] = useState([]);
	const [sports, setSports] = useState([]);

    // Backend
    function fetchUserdata()
    {
		if (profile_uid === null)
			return;

        fetch('/userdata/fetchpublic?id=' + profile_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => setUserdata(json));
            } else if (response.status === 404) {
                navigate('/user');
            } 
        });
    }

	function fetchDatafields()
    {
        fetch('/datafields/usertypes', {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => {
                    setUserTypes(json);
                });
            }
        });

		fetch('/datafields/sports', {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => {
                    setSports(json);
                });
            }
        });
    }

	/*eslint-disable */
	useEffect(() => {fetchUserdata(); fetchDatafields();}, []);
	/*eslint-enable */

	if (userdata)
	{
		return (
			<Box height="100vh" width="100vw" display="flex">
				<Dashboard useDefault={true} />

				<Stack direction="column" sx={{padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>
					
					<Box sx={{backgroundImage: `url(${defaultbanner})`, maxWidth: '1920px', width: 'calc(100% + 4rem)', marginX: '-4rem',
						alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
						<Avatar src={`/images/pfp/${profile_uid}.jpg?${new Date().valueOf()}`} sx={{ width: '6em', height: '6em', marginY: '0.25em', border: '0.12em solid', borderColor: theme.palette.common.white }}/>

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

					<Box sx={{display: 'flex', gap: '0.35em', flexDirection: 'row', fontSize: '1.125rem', alignItems: 'center', letterSpacing: '0.06em', mb: '1em'}}>
						
						{Object.keys(userdata.types).map((key) => {
							if (userTypes === null || userTypes === undefined || userTypes.length === 0)
								return(undefined);
							const curtype = userTypes.find(element => element.id === userdata.types[key]);
							return (
								<Chip icon={<Icon>{curtype.mui_icon}</Icon>} label={curtype.title} />
							);
						})}
					</Box>
					<Divider sx={{width: '16rem'}} />

					<Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
						<p>Sobre</p>
					</Typography>

					<Typography component="div" sx={{borderRadius: '0.5em', textAlign: 'center', minWidth: '20rem', width: '50%', backgroundColor: theme.palette.background.overlay, padding: '0em 1em'}}>
						<p>{userdata.biography !== null ? userdata.biography : 'Este usuário não adicionou sua biografia'}</p>
					</Typography>

					<Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
						<p>Esportes</p>
					</Typography>

					<Typography sx={{marginTop: '-1em', textAlign: 'center', display: (userdata.sports && userdata.sports.length > 0) ? 'none' : 'auto'}} fontSize="0.965rem" component="div" letterSpacing="0.02em">
						<p>Nenhum esporte por aqui</p>
					</Typography>


					<Box sx={{width: '60%', minWidth: '18em', display: 'flex', gap: '0.35em', flexDirection: 'row', flexWrap: 'wrap', fontSize: '1.125rem', justifyContent: 'center', letterSpacing: '0.06em', mb: '1em'}}>
						{Object.keys(userdata.sports).map((key) => {
							if (sports === null || sports === undefined || sports.length === 0)
								return(undefined);
							const curtype = sports.find(element => element.id === userdata.sports[key]);
							return (
								<Chip color="primary" icon={<Icon>{curtype.mui_icon}</Icon>} label={curtype.title} />
							);
						})}
					</Box>

					<Fab href="/editarperfil" color="primary" aria-label="edit" sx={{position: 'absolute', bottom: '3rem', right: '3rem', zIndex: 255, 
						display: session_uid === parseInt(profile_uid) ? 'auto' : 'none'}}>
						<Edit />
					</Fab>

				</Stack>
			</Box>
		);
	}
	else return (
		<Loading />
	)
}

export default User;
