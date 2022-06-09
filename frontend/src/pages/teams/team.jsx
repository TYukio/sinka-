import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Divider, Fab, Chip, Icon, Container, useMediaQuery, Menu, MenuItem, IconButton } from '@mui/material';
import { Edit, MoreVert, SportsOutlined, Star } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import defaultbanner from './defaultbanner.png'

function Team(props) {
	const [teamdata, setTeamdata] = useState();
	const navigate = useNavigate()
	const params = useParams();
	const theme = useTheme();

	const session_uid = useContext(SessionContext);
	const team_uid = params.id;

	const [sports, setSports] = useState([]);

	const [contextTarget, setContextTarget] = useState(null)
	const [contextTargetMember, setContextTargetMember] = useState(null)

	// Backend
	const hostname = useContext(HostContext);

	const mobile = useMediaQuery('(max-width:1240px)');
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

	function removeMember() {
		if (team_uid === null)
			return;

		fetch(hostname + 'teamdata/removemember', {
			method: 'DELETE',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_team: team_uid,
                id_person: contextTargetMember.id
            })
		}).then(response => {
			if (response.ok) {
				fetchTeamdata();
				setContextTarget(null);
			}
		});
	}

	function setCoach() {
		if (team_uid === null)
			return;

		fetch(hostname + 'teamdata/setcoach', {
			method: 'PATCH',
			credentials: 'include',
			headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_team: team_uid,
                id_person: contextTargetMember.id,
				coach: contextTargetMember.coach === true ? 0 : 1
            })
		}).then(response => {
			if (response.ok) {
				fetchTeamdata();
				setContextTarget(null);
			}
		});
	}

	/*eslint-disable */
	useEffect(() => { fetchTeamdata(); fetchDatafields(); }, []);
	/*eslint-enable */

	if (teamdata && sports.length > 0) {
		return (

			<Box height="100%" width="100%" display="flex" sx={{overflowX: mobile ? 'auto' : 'hidden'}} >
				<Dashboard sx={{ position: 'fixed' }} useDefault={true} />

				<Stack direction="column" sx={{ padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

					<Box sx={{
						backgroundImage: `url(${defaultbanner})`,
						width: 'calc(100% + 8rem)',
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
							justifyContent: mobile ? 'center' : 'space-evenly',
							flexWrap: 'wrap',
							gap: mobile ? '3rem' : '5rem',
							marginTop: mobile ? '8rem' : '2rem',
							marginBottom: '1em'
						}} >
							<Box sx={{
								marginTop: '-4rem',
								
							}}>
								<Typography fontWeight="500" variant="h4" component="div" sx={{ justifyContent: 'left', color: theme.palette.common.white, textTransform: 'uppercase', letterSpacing: '2px', marginTop: mobile ? '-4rem' : '-7rem', marginLeft: mobile ? '0.8rem' : '0', width:'100%', }}>
									<p>{teamdata.title}</p></Typography>
								<Box sx={{
									backgroundColor: theme.palette.background.box,
									height: '25rem',
									marginTop:mobile?'-1em': '4.2rem',
									width: '30rem',
									marginLeft: mobile ? '0em' : '-2em',
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

									<Typography>{teamdata.gender === 'o' ? 'Misto' : (teamdata.gender === 'm' ? 'Masculino' : 'Feminino')}</Typography>
								</Box>
							</Box>
							<Box sx={{

								marginTop: '-2.1rem'
							}}>

								<Box sx={{
									backgroundColor: theme.palette.background.box,
									height: '25rem',
									width: '30rem',
									marginRight: mobile ? '0em' : '-2em',
									borderRadius: '10px',
									border: 1,
									borderColor: theme.palette.background.overlay,
									padding: '2em',
								}}>
									<Typography sx={{
										color: "#E0F80E",
										fontWeight: '700',
										letterSpacing: '1.4px',
										textTransform: 'uppercase',
										marginTop: '1.5em',
										marginBottom: '0.5em',
										fontSize: '16px',
									}}>Participantes</Typography>


									<Menu
										anchorEl={contextTarget}
										open={contextTarget !== null}
										onClose={() => setContextTarget(null)}
									>
										<MenuItem onClick={setCoach}>{ contextTargetMember === null || !contextTargetMember.coach ? 'Tornar coach' : 'Revogar coach'}</MenuItem>
										{
											(contextTargetMember !== null && contextTargetMember.id !== session_uid) ?
												<MenuItem sx={{color: '#E34234'}} onClick={() => {if (window.confirm("Tem certeza que deseja remover este usuário?")) removeMember(); } }>Remover integrante</MenuItem> :
												undefined
										}
										
									</Menu>

									{Object.keys(teamdata.members).map((key, i) => {

										let member = teamdata.members[i];

										return (
											<Box marginTop="0.5em" sx={{ cursor: "pointer" }} display="flex" justifyContent="left">
												
												<Box display="flex" flexGrow="1" onClick={() => navigate(`/user/${member.id_person}`)}>
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
															<Typography marginRight="0.35em" color={member.coach > 0 ? '#E0F80E' : 'auto'}>{member.full_name}</Typography>
															{teamdata.id_creator === member.id_person ? <Star sx={{ color: 'primary' }} /> : undefined}
															{member.coach > 0 ? <SportsOutlined sx={{ color: '#E0F80E' }} /> : undefined}
														</Box>

														<Typography fontSize="0.75em"><b>Desde: </b>{member.joined.substr(0, 10).split('-').reverse().join('/')}</Typography>
													</Stack>

												</Box>

												<IconButton
													sx={{height: '2em', width: '2em', alignSelf: "center", display: session_uid === parseInt(teamdata.id_creator) ? 'auto' : 'none'}}
													onClick={(event) => {setContextTarget(event.target); setContextTargetMember({id: member.id_person, coach: member.coach > 0})}}
												>
													<MoreVert />
												</IconButton>

											</Box>
										)
									})}

								</Box>
							</Box>
						</Stack>

					</Container>


					<Fab href={'/editartime/' + team_uid} color="primary" aria-label="edit" sx={{
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
				<Fab href="/myteam" color="primary" aria-label="edit" sx={{
                        position: 'fixed', bottom: '3rem', left: mobile ? '3rem' : '15rem', zIndex: 255,

                    }}>
                        <ArrowBackIcon/>
                    </Fab>
			</Box >
		);
	}
	else
        return (<Loading />)
}

export default Team;