import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Divider, Fab, Chip, Icon, Container, Button, useMediaQuery } from '@mui/material';
import { Edit, SportsOutlined } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';
import { fakeComponentAlert } from '../../util/miscmethods';
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import InfoIcon from '@mui/icons-material/Info';

import defaultbanner from './defaultbanner.png'

function Team(props) {
	const [teamdata, setTeamdata] = useState();
	const navigate = useNavigate()
	const params = useParams();
	const theme = useTheme();

	const session_uid = useContext(SessionContext);
	const team_uid = params.id;

	const [sports, setSports] = useState([]);

	// Backend
	const hostname = useContext(HostContext);
    
	const mobile = useMediaQuery('(max-width:768px)');
	function fetchTeamdata() {
		if (team_uid === null)
			return;

		fetch(hostname + 'teamdata/fetchpublic?id=' + team_uid, {
			method: 'GET'
		}).then(response => {
			if (response.ok) {
				response.json().then((json) => setTeamdata(json));
			} else if (response.status === 404) {
				navigate('/user');
			}
		});
	}

	function fetchDatafields() {
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
	useEffect(() => { fetchTeamdata(); fetchDatafields(); }, []);
	/*eslint-enable */

	if (teamdata) {
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
						<Stack direction={'collumn'} sx={{

							width: '100%',
							height: '8em',


							justifyContent: 'center'
						}}>
							<Avatar src={hostname + `images/team_pfp/${team_uid}.jpg?${new Date().valueOf()}`} sx={{
								width: '12em',
								height: '12em',
								marginY: '0.25em',
								border: '0.24em solid',
								borderColor: theme.palette.background.overlay,
								backgroundColor: theme.palette.background.box,
								marginTop: '-7.5rem',
							}} />
						</Stack>
						<Stack direction={'collumn'} sx={{
							display: 'flex',
							width: '100%',
							height: '8em',
							marginTop: '-8rem',

							justifyContent: 'space-between'
						}}>







						</Stack>
						<Stack direction={'collumn'} sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							gap: '5rem',
							marginBottom: '1em'
						}} >
							<Box sx={{
								marginTop:'-5rem'
							}}>
								<Typography fontWeight="500" variant="h4" component="div" sx={{ justifyContent: 'left', color: theme.palette.common.white, textTransform: 'uppercase', letterSpacing: '2px', marginTop:'-4rem' }}>
									<p>{teamdata.title}</p></Typography>
								<Box sx={{
									backgroundColor: theme.palette.background.box,
									height: '25rem',
									width: '30rem',
									marginLeft: '-2em',
									borderRadius: '10px',
									border: 1,
									borderColor: theme.palette.background.overlay,
									padding: '2em',
									paddingLeft: '3em',
									paddingRight: '3em'
								}}>

									<Typography sx={{
										color: "#E0F80E",
										fontWeight: '700',
										letterSpacing: '1.4px',
										textTransform: 'uppercase',
										marginBottom: '0.5em',
										fontSize: '16px',
									}}>Esporte</Typography>
									<Chip color="primary" icon={<Icon>{sports.find(element => element.id === teamdata.id_sport).mui_icon}</Icon>} label={sports.find(element => element.id === teamdata.id_sport).title} />

									<Typography sx={{
										color: "#E0F80E",
										fontWeight: '700',
										letterSpacing: '1.4px',
										textTransform: 'uppercase',
										marginTop: '1.5em',
										marginBottom: '0.5em',
										fontSize: '16px',
									}}>Descrição</Typography>
									<Typography>{teamdata.about}</Typography>

									<Typography sx={{
										color: "#E0F80E",
										fontWeight: '700',
										letterSpacing: '1.4px',
										textTransform: 'uppercase',
										marginTop: '1.5em',
										marginBottom: '0.5em',
										fontSize: '16px',
									}}>Gênero</Typography>

									<Typography>{teamdata.gender == 'o' ? 'Unisex' : (teamdata.gender == 'm' ? 'Masculino' : 'Feminino')}</Typography>
								</Box>
							</Box>
							<Box sx={{
								marginTop:'-5rem'
							}}>
								<Typography fontWeight="500" variant="h4" component="div" sx={{ justifyContent: 'left', color: theme.palette.common.white, marginTop:'-4rem' }}>
									<p>Participantes</p>
                                </Typography>
								<Box sx={{
									backgroundColor: theme.palette.background.box,
									height: '25rem',
									width: '30rem',
									marginRight: '-2em',
									borderRadius: '10px',
									border: 1,
									borderColor: theme.palette.background.overlay,
									padding: '2em',
								}}>

                                    {Object.keys(teamdata.members).map((key, i) => {

                                        let member = teamdata.members[i];

                                        return (
                                            <Box onClick={() => navigate(`/user/${member.id_person}`)} marginTop="0.5em" sx={{cursor: "pointer"}} display="flex" justifyContent="left">
                                                <Avatar onHover={{}} src={hostname + `images/pfp/${member.id_person}.jpg?${new Date().valueOf()}`} sx={{
                                                    width: '2.5em',
                                                    height: '2.5em',
                                                    marginY: '0.25em',
                                                    border: '0.12em solid',
                                                    marginRight: '0.75em',
                                                    borderColor: theme.palette.common.white
                                                }} />

                                                <Stack alignSelf="center">
                                                    <Box display="flex">
                                                        <Typography marginRight="0.35em" color={member.coach == 1 ? '#E0F80E' : 'auto'}>{member.full_name}</Typography>
                                                        {member.coach == 1 ? <SportsOutlined sx={{color: '#E0F80E'}}/> : undefined}
                                                    </Box>

                                                    <Typography fontSize="0.75em"><b>Desde: </b>{member.joined.substr(0, 10).split('-').reverse().join('/')}</Typography>
                                                </Stack>
                                                
                                            </Box>
                                        )
                                    })}

								</Box>
							</Box>
						</Stack>

					</Container>


					<Fab href="/editarperfil" color="primary" aria-label="edit" sx={{
						position: 'fixed', bottom: '3rem', right: '3rem', zIndex: 255,
						display: session_uid === parseInt(teamdata.id_creator) ? 'auto' : 'none'
					}}>
						<Edit />
					</Fab>
					<Divider sx={{ width: '16rem' }} />
					<Box sx={{ display: 'flex', flexDirection: 'row', fontSize: '0.725rem', alignItems: 'center', letterSpacing: '0.06em', marginLeft: '2px', }}>
						<p>Criado em</p>
						<Typography fontWeight="bold" component="div" sx={{ marginLeft: '0.35em', fontSize: '0.725rem', marginTop: '1px', }}>
							<p>{teamdata.creation.substr(0, 10).split('-').reverse().join('/')}</p>
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

export default Team;