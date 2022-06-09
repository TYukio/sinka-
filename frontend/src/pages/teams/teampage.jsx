import { useEffect, useState, useContext } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, Fab, Chip, Icon, Button, useMediaQuery, TextField, Checkbox, FormControlLabel } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';

import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import { Add, Search } from '@mui/icons-material';
import defaultbanner from './defaultbanner.png'

function TeamPage(props) {
    const [teamsdata, setTeamsdata] = useState();
    const navigate = useNavigate()
    const theme = useTheme();

    const session_uid = useContext(SessionContext);

    const [sports, setSports] = useState([]);

    const [searchTerms, setSearchTerms] = useState('');
    const [memberOnly, setMemberOnly] = useState(false);


    // Backend
    const hostname = useContext(HostContext);
    const mobile = useMediaQuery('(max-width:920px)');

    function fetchUserdata() {
        fetch(hostname + 'teamdata/fetchall?', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => setTeamsdata(json));
            } else if (response.status === 404) {
                navigate('/');
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
    useEffect(() => { fetchUserdata(); fetchDatafields(); }, []);
    /*eslint-enable */

    if (teamsdata && sports.length > 0) {
        return (
            <Box height="100%" width="100%" display="flex">
                <Dashboard sx={{ position: 'fixed' }} useDefault={true}></Dashboard>

                <Stack direction="column" sx={{
                    padding: '2rem',
                    paddingTop: '1em',
                    flexGrow: 1,
                    overflowWrap: 'break-all',
                    alignItems: 'center'
                }}>

                    <Typography sx={{
                        marginBottom: '1em',
                        fontSize: '2em',
                        fontWeight: '700'
                    }}>Times</Typography>

                    <Box display="flex" textAlign="center" sx = {{width: '25%', minWidth: '20em', maxWidth: '30em'}}>
                        <TextField
                            label="Buscar time"
                            type="search"
                            variant="standard"
                            sx={{flexGrow: 1}}
                            onChange={(event) => setSearchTerms(event.target.value)}
                        />
                    </Box>
                    
                    <FormControlLabel
                        sx={{ display: session_uid !== null ? 'auto' : 'none' }}
                        control= { <Checkbox onChange={(event) => setMemberOnly(event.target.checked) } /> }
                        label="Apenas times em que faço parte"
                    />
                    <Box sx={{

                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: '40px',
                        alignItems: 'center',
                        maxWidth: '1900px',
                        marginTop: '3em'

                    }}>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '5rem',
                            flexWrap: 'wrap'
                        }}>
                            {
                                Object.keys(teamsdata).map((key, i) => {
                                    let team = teamsdata[i];

                                    let memberFilter = false;
                                    if (memberOnly)
                                    {
                                        for (let i = 0; i < team.members.length; ++i)
                                            if (team.members[i].id_person === session_uid)
                                            {
                                                memberFilter = true;
                                                break;
                                            }
                                    }
                                    else
                                        memberFilter = true;
                                    
                                    if (team.title.toLowerCase().includes(searchTerms.toLowerCase()) && memberFilter)
                                        return (
                                            <>
                                                <Stack orientation={'row'}
                                                    sx={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '1rem',
                                                        justifyContent: 'center',
                                                        marginTop: mobile ? '2em' : 'none'
                                                    }}>

                                                    <Box sx={{
                                                        height: '100%',
                                                        width: '20rem',

                                                        marginBottom: mobile ? '0' : '2em',
                                                        margin: 'auto',
                                                        justifyContent: 'center',
                                                        background: theme.palette.background.box,
                                                        borderRadius: '20px',
                                                        padding: '2em'

                                                    }}>
                                                        <Box sx={{
                                                            backgroundImage: `url(${defaultbanner})`,
                                                            width: 'calc(100% + 4em)',
                                                            margin: '-2em',
                                                            borderTopLeftRadius: '20px',
                                                            borderTopRightRadius: '20px',
                                                            backgroundSize: 'cover',
                                                            borderRadiusTop: '20px',
                                                            height: '15vh',
                                                            alignItems: 'center',
                                                            display: 'relative',
                                                            flexDirection: 'column'
                                                        }}></Box>
                                                        <Stack direction={'collumn'} sx={{
                                                            justifyContent: 'center',
                                                        }}>
                                                            <Avatar
                                                                alt={team.title}
                                                                src={hostname + `images/team_pfp/${team.id}.jpg?${new Date().valueOf()}`}
                                                                sx={{

                                                                    justifyContent: 'center',
                                                                    marginTop: '-3em',
                                                                    height: '10rem',
                                                                    width: '10rem',
                                                                    borderRadius: '50%',
                                                                    background: theme.palette.background.box,
                                                                    border: 1,
                                                                    borderColor: theme.palette.background.overlay
                                                                }}></Avatar>
                                                        </Stack>
                                                        <Stack sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            margin: '0',
                                                            width: '100%',
                                                            marginTop: '1em',
                                                            alignText: 'center',
                                                            flex: 'wrap',

                                                        }}>
                                                            <Typography sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                fontSize: '1.35em',
                                                                fontWeight: '600',
                                                                
                                                                textTransform: 'uppercase',
                                                            }}>{team.title}</Typography>

                                                        </Stack>

                                                        <Box gap="0.5em" marginTop="2em" justifyContent="center" maxWidth="100%" display="flex">
                                                            {
                                                                Object.keys(team.members).map((key, i) => {
                                                                    let member = team.members[i];

                                                                    return (
                                                                        <Box sx={{ cursor: 'pointer' }}>
                                                                            <Avatar onClick={() => navigate(`/user/${member.id_person}`)}
                                                                                src={hostname + `images/pfp/${member.id_person}.jpg?${new Date().valueOf()}`} sx={{
                                                                                    width: '2em',
                                                                                    height: '2em',
                                                                                    marginY: '0.25em',
                                                                                    border: '0.12em solid',
                                                                                    borderColor: member.coach === 1 ? "#E0F80E" : theme.palette.common.white,
                                                                                    marginTop: '-1.5rem',
                                                                                }} />
                                                                        </Box>

                                                                    )
                                                                })
                                                            }
                                                        </Box>
                                                        <Box display="flex" marginTop="1em" justifyContent="center">
                                                            <Chip color="primary" icon={<Icon>{sports.find(element => element.id === team.id_sport).mui_icon}</Icon>} label={sports.find(element => element.id === team.id_sport).title} />
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                            margin: 'auto',

                                                        }}>
                                                            <Button variant='contained' href={'/team/' + team.id} sx={{
                                                                borderRadius: '50px',
                                                                height: '4rem',
                                                                width: '12rem',
                                                                fontSize: '1.2rem',
                                                                marginTop: '2rem',
                                                                backgroundColor: "#E0F80E",
                                                                color: '#000',
                                                                fontWeight: '600',
                                                                '&:hover':
                                                                    { color: "white" }

                                                            }}>Visitar Página</Button>
                                                        </Box>

                                                    </Box>
                                                </Stack>
                                            </>

                                        );
                                    else
                                        return (undefined);
                                })
                            }
                        </Box>
                    </Box>

                    <Fab href="/editartime/novo" color="primary" aria-label="edit" sx={{
                        position: 'fixed', bottom: '3rem', left: mobile ? '3rem' : '15rem', zIndex: 255, display: session_uid !== null ? 'auto' : 'none'
                    }}>
                        <Add />
                    </Fab>
                </Stack>
            </Box >

        )

    }	
	else
        return (<Loading />)
}

export default TeamPage