import { useEffect, useState, useContext } from 'react';
import { Box, Stack, Typography, Fab, useMediaQuery, TextField } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';

import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';
import CardLocal from '../../components/cardlocal';
import { Add } from '@mui/icons-material';

function CourtPage(props) {
    const [courtsdata, setCourtsdata] = useState();
    const navigate = useNavigate()

    const session_uid = useContext(SessionContext);

    const [sports, setSports] = useState([]);

    const [searchTerms, setSearchTerms] = useState('');
    const [isOrganizer, setIsOrganizer] = useState(false);

    // Backend
    const hostname = useContext(HostContext);
    const mobile = useMediaQuery('(max-width:920px)');

    function fetchCourtdata() {
        fetch(hostname + 'courtdata/fetchall', {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => setCourtsdata(json));
            } else if (response.status === 404) {
                navigate('/');
            }
        });
    }

    function fetchUserdata() {
		if (session_uid === null)
			return;

		fetch(hostname + 'userdata/fetchpublic?id=' + session_uid, {
			method: 'GET'
		}).then(response => {
			if (response.ok) {
				response.json().then((json) => {
                    for (let i = 0; i < json.types.length; ++i)
                    {
                        // 4 é organizador
                        if (json.types[i] === 4)
                        {
                            setIsOrganizer(true);
                            break;
                        }
                    }

                });
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
    useEffect(() => { fetchCourtdata(); fetchDatafields(); }, []);
    useEffect(() => { fetchUserdata(); }, [session_uid]);
    /*eslint-enable */

    if (courtsdata && sports.length > 0) {
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
                    }}>Locais Esportivos</Typography>

                    <Box display="flex" textAlign="center" sx = {{width: '25%', minWidth: '20em', maxWidth: '30em'}}>
                        <TextField
                            label="Buscar local"
                            type="search"
                            variant="standard"
                            sx={{flexGrow: 1}}
                            onChange={(event) => setSearchTerms(event.target.value)}
                        />
                    </Box>
                    
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
                                Object.keys(courtsdata).map((key, i) => {
                                    let court = courtsdata[i];
                                    
                                    if (court.title.toLowerCase().includes(searchTerms.toLowerCase()))
                                        return (
                                            <>
                                                <CardLocal title={court.title} subtitle={court.subtitle}
                                                    sport={sports.find(element => element.id === court.id_sport)}
                                                    image={hostname + `images/court/${court.id}.jpg?${new Date().valueOf()}`}
                                                    address={court.addressname}
                                                    id={court.id_owner === session_uid ? court.id : null}
                                                    refreshCallback={fetchCourtdata}
                                                />
                                            </>

                                        );
                                    else
                                        return (undefined);
                                })
                            }
                        </Box>
                    </Box>
                    <Fab href="/cadastrarlocal" color="primary" aria-label="edit" sx={{
                        position: 'fixed', bottom: '3rem', left: mobile ? '3rem' : '15rem', zIndex: 255, display: isOrganizer ? 'auto' : 'none'
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

export default CourtPage