import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Divider, Fab, Chip, Icon, Container, Button, useMediaQuery, Badge } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';
import { fakeComponentAlert } from '../../util/miscmethods';
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import InfoIcon from '@mui/icons-material/Info';


import defaultbanner from './defaultbanner.png'

function User(props) {
	const [userdata, setUserdata] = useState();
	const [teamsdata, setTeamsdata] = useState();
	const navigate = useNavigate()
	const params = useParams();
	const theme = useTheme();

	const session_uid = useContext(SessionContext);
	const profile_uid = params.id;

	const [userTypes, setUserTypes] = useState([]);
	const [sports, setSports] = useState([]);

	// Backend
	const hostname = useContext(HostContext);
	const mobile = useMediaQuery('(max-aspect-ratio: 3/2)');
	function fetchUserdata() {
		if (profile_uid === null)
			return;

		fetch(hostname + 'userdata/fetchpublic?id=' + profile_uid, {
			method: 'GET'
		}).then(response => {
			if (response.ok) {
				response.json().then((json) => setUserdata(json));
			} else if (response.status === 404) {
				navigate('/user');
			}
		});
	}

	function fetchTeams() {
		if (profile_uid === null)
			return;

		fetch(hostname + 'userdata/teams?id=' + profile_uid, {
			method: 'GET'
		}).then(response => {
			if (response.ok) {
				response.json().then((json) => setTeamsdata(json));
			} else if (response.status === 404) {
				navigate('/user');
			}
		});
	}

	function fetchDatafields() {
		fetch(hostname + 'datafields/usertypes', {
			method: 'GET'
		}).then(response => {
			if (response.ok) {
				response.json().then((json) => {
					setUserTypes(json);
				});
			}
		});

		fetch(hostname + 'datafields/sports', {
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
	useEffect(() => { fetchUserdata(); fetchDatafields(); fetchTeams(); }, []);
	/*eslint-enable */

	if (userdata && teamsdata && sports.length > 0 && userTypes.length > 0) {
		return (

			<Box height="100%" width="100%" display="flex" >
				<Dashboard sx={{ position: 'fixed' }} useDefault={true} />

				
				<Stack direction="column" sx={{ padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

					<Box sx={{
						backgroundImage: `url(${defaultbanner})`,
						width: 'calc(100% + 4rem)',
						backgroundSize: 'cover',
						marginX: '-4rem',
						height: '30vh',
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}>
					</Box>
					<Container>
						<Box sx={{
							display: 'flex',
							width: '100%',
							height: '8em',

							gap: '1.5em',
							justifyContent: 'space-between',
							flexGrow: '1'
						}}>
							<Box sx={{
								display: 'flex',
								gap: '1em'
							}}>
								<Avatar src={hostname + `images/pfp/${profile_uid}.jpg?${new Date().valueOf()}`} sx={{
									width: '6.5em',
									height: '6.5em',
									marginY: '0.25em',
									border: '0.12em solid',
									borderColor: theme.palette.common.white,
									marginTop: '-1.5rem',
								}} />

								<Typography fontWeight="500" variant="h4" component="div" sx={{ marginY: '-1em', color: theme.palette.common.white, marginTop: '-15px', fontSize:mobile ? '1.5em' : '2em' }}>
									<p>{userdata.full_name}</p>

								</Typography>  
							</Box>
							<Box sx={{

								
								display: 'flex',
								marginTop:'0.5em', 
								flexWrap: 'wrap',
								gap:'0.5em',

							}}>

								<Button variant="outlined" onClick={fakeComponentAlert} sx=
									{{
										height: '2rem',
										
										borderRadius: '50px',
										marginTop: '4px',
										width: mobile ? '8rem' : '6rem',
									}}>
									Seguir
								</Button>
								<Button variant="contained" onClick={fakeComponentAlert} sx=
									{{
										height: '2rem',
										minWidth: '64px',
										borderRadius: '50px',
										marginTop: mobile ? '-2em': '4px',
										width: mobile ? '8rem' : '8rem',
									}}>
									Mensagem
								</Button>
							</Box>

						</Box>


						<Box sx={{ flexGrow: 1 }}>
							<Typography sx={{
								fontWeight: 'semibold',
								alignItens: 'center',
								justifyContent: 'flex-start',
								paddingBottom: '0.5em',
							}}>TAGS <InfoIcon sx={{
								marginBottom: '-0.1em',
								fontSize: '0.85em'
							}}></InfoIcon></Typography>
							<Box sx={{ display: 'flex', gap: '0.45em', flexDirection: 'row', fontSize: '0.5em', alignItems: 'center', letterSpacing: '0.06em', mb: '2em' }}>

								{Object.keys(userdata.types).map((key, i) => {
									if (userTypes === null || userTypes === undefined || userTypes.length === 0)
										return (undefined);
									const curtype = userTypes.find(element => element.id === userdata.types[key]);
									return (
										<Chip key={i} icon={<Icon>{curtype.mui_icon}</Icon>} label={curtype.title} />
									);
								})}
							</Box>
						</Box>
					</Container>
					<Container sx={{
						marginLeft: mobile? '2rem':'13rem',
						justifyContent: 'space-evenly',
						display: 'flex',
						flexWrap: 'wrap',

					}}>
						<Box sx={{ maxWidth: '25rem' }}>
							<Typography fontSize="1rem" component="div" letterSpacing="0.06em" marginBottom={'-1em'} textTransform={'uppercase'}>
								<p>Sobre</p>
							</Typography>

							<Typography component="div" sx={{ borderRadius: '0.5em', textAlign: 'center', minWidth: '20rem', width: '40%', backgroundColor: theme.palette.background.box, padding: '0.5em 1em', border:1,
								borderColor:theme.palette.background.overlay }}>
								<p>{userdata.biography !== null ? userdata.biography : 'Este usuário não adicionou sua biografia'}</p>
							</Typography>
						</Box>
						<Box sx={{ maxWidth: '25rem' }}>
							<Typography fontSize="1rem" component="div" letterSpacing="0.06em" marginBottom={'-1em'} textTransform={'uppercase'}>
								<p>Equipes</p>
							</Typography>

							<Typography component="div" sx={{ display: 'flex', gap: '0.75em', overflowX: 'scroll', borderRadius: '0.5em', minHeight: '4.5em', minWidth: '20rem', width: '40%', backgroundColor: theme.palette.background.box, padding: '0.5em 1em', border:1,
								borderColor:theme.palette.background.overlay }}>
								{
									Object.keys(teamsdata).map((key, i) => {
										let team = teamsdata[i];

										return (
											<Stack  direction="column" sx={{ cursor: 'pointer', alignItems: 'center', textAlign: 'center' }}>
												
												<Badge color="primary"
													overlap="circular"
													anchorOrigin= {{ vertical: 'bottom', horizontal: 'right' }}
													badgeContent= {
														<Icon sx={{fontSize: '1.25em'}}>{sports.find(element => element.id === team.id_sport).mui_icon}</Icon>
													}
												>
													<Avatar onClick={() => navigate(`/team/${team.id}`)}
														src={hostname + `images/team_pfp/${team.id}.jpg?${new Date().valueOf()}`} sx={{
															width: '2em',
															height: '2em',
															border: '0.12em solid',
															marginTop: '0.45em',
															borderColor: theme.palette.common.white,
													}}/>
												</Badge>
												<Typography justifySelf="center" maxWidth="6em">

													{team.title}
												</Typography>
											</Stack>
										)
									})
								}

								<Typography width="100%" alignSelf="center" justifySelf="center" textAlign="center">
									{teamsdata.length === 0 ? 'Nenhuma equipe associada' : undefined}
								</Typography>
							</Typography>
						</Box>
					</Container>

					<Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
						<p>Esportes</p>
					</Typography>

					<Typography sx={{ marginTop: '-1em', textAlign: 'center', display: (userdata.sports && userdata.sports.length > 0) ? 'none' : 'auto' }} fontSize="0.965rem" component="div" letterSpacing="0.02em">
						<p>Nenhum esporte por aqui</p>
					</Typography>

					<Box sx={{ width: '60%', minWidth: '18em', display: 'flex', gap: '0.35em', flexDirection: 'row', flexWrap: 'wrap', fontSize: '1.125rem', justifyContent: 'center', letterSpacing: '0.06em', mb: '1em' }}>
						{Object.keys(userdata.sports).map((key, i) => {
							if (sports === null || sports === undefined || sports.length === 0)
								return (undefined);
							const curtype = sports.find(element => element.id === userdata.sports[key]);
							return (
								<Chip color="primary" icon={<Icon>{curtype.mui_icon}</Icon>} label={curtype.title} />
							);
						})}
					</Box>

					<Fab href="/editarperfil" color="primary" aria-label="edit" sx={{
						position: 'fixed', bottom: '3rem', right: '3rem', zIndex: 255,
						display: session_uid === parseInt(profile_uid) ? 'auto' : 'none'
					}}>
						<Edit />
					</Fab>
					<Divider sx={{ width: '16rem' }} />
					<Box sx={{ display: 'flex', flexDirection: 'row', fontSize: '0.725rem', alignItems: 'center', letterSpacing: '0.06em', marginLeft: '2px', }}>
						<p>Membro desde</p>
						<Typography fontWeight="bold" component="div" sx={{ marginLeft: '0.35em', fontSize: '0.725rem', marginTop: '1px', }}>
							<p>{userdata.creation.substr(0, 10).split('-').reverse().join('/')}</p>

						</Typography>

					</Box>
					
				</Stack>
			</Box >
		);
	}
	else return (
		<Loading />
	)
}

export default User;
