import { useEffect, useState, useContext, useRef } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Icon, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';
import LoadingButton from '@mui/lab/LoadingButton';
import formvalidation from '../../util/formvalidation';
import validator from 'validator'
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';

function Teamedit(props) {
    const [formdata, setFormdata] = useState({
        name: { value: '', err: false, touched: false },
        about: { value: null, err: false, touched: false  },
        gender: { value: null, err: false, touched: false },
        sport: { value: null, err: false, touched: false }
    });
    const [formvalid, setFormvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
	const [teamdata, setTeamdata] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(null);
    const avatarBrowser = useRef(null);
    const params = useParams();
	const navigate = useNavigate()
	const theme = useTheme();

	const session_uid = useContext(SessionContext);
    const team_uid = params.id;

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);

    const [sports, setSports] = useState({});

    // Backend
    const hostname = useContext(HostContext);

    function fetchTeamdata()
    {
		if (session_uid === null)
            return;

        fetch(hostname + 'teamdata/fetchpublic?id=' + team_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => {
                    setTeamdata(json);
                    setFormdata(
                        {
                            ...formdata,
                            name: { value: json.title, err: false, touched: false },
                            about: { value: json.about, err: false, touched: false  },
                            gender: { value: json.gender, err: false, touched: false },
                            sport: { value: json.id_sport, err: false, touched: false }
                        }
                    )       
                });
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
				response.json().then((json) => setUserdata(json));
			} else if (response.status === 404) {
				navigate('/user');
			}
		});
	}

    function fetchDatafields()
    {
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

    function updateTeamdata()
    {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("id", team_uid);
        formData.append("name", formdata.name.value);
        formData.append("about", formdata.about.value);
        formData.append("gender", formdata.gender.value);
        formData.append("sport", formdata.sport.value);

        if (avatarSelection !== null)
            formData.append("avatar", avatarSelection);
            
        fetch(hostname + 'teamdata/update', {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        }).then(response => {
            setIsLoading(false);
            if (response.ok) { 
                navigate('/team/' + team_uid);
            }
            // TODO checagem de erros mínima
        });
    }

	/*eslint-disable */
	useEffect(() => {fetchTeamdata(); fetchUserdata(); fetchDatafields();}, [session_uid]);
    useEffect(formValidateEffect, [formdata]);
	/*eslint-enable */

	if (teamdata && userdata && sports.length > 0)
	{
        if (teamdata.id_creator !== session_uid)
            return(<Navigate to={'/team/' + team_uid} />);

		return (
			<Box sx={{height: '100%', width:'100%', display: 'flex'}}>
				<Dashboard useDefault={true} />

				<Stack direction="column" sx={{padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

                    <Typography fontWeight="bold" variant="h4" component="div" sx={{marginY: '1rem', color: theme.palette.common.white}}>
                        <p>Editar time Sinka</p>
                    </Typography>
					
                    <Box display="flex" justifyContent="center" flexWrap="wrap" alignItems="center" spacing="1em" sx={{maxWidth: '75%'}}>

                    <IconButton onClick={()=> avatarBrowser.current.click()} onMouseEnter={() => setAvatarEdit(true)} onMouseLeave={() => setAvatarEdit(false)}>
                        <Avatar
                            src={avatarSelection !== null ? URL.createObjectURL(avatarSelection) : hostname + `images/team_pfp/${team_uid}.jpg`}
                            sx={{width: '5em', height: '5em'}}
                        />
                        <Edit sx={{position: 'absolute', display: avatarEdit ? 'auto' : 'none'}} />
                        <input
                            ref={avatarBrowser}
                            onChange={(event) => setAvatarSelection(event.target.files[0])}
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </IconButton>

                        <TextField label="Nome" variant="standard" sx={{width: '14rem', paddingBottom: '1em', ml: '1em'}}
                            value={formdata.name.value} onChange={ (event) => onChangeHandler('name', event.target.value, (value) => validator.isLength(value, {min: 4, max: 64} ) ) }
                            error={inErrorState('name')} helperText={inErrorState('name') ? 'O nome deve conter entre 4 e 64 caracteres' : ''} />
                    </Box>

					<Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
						<p>Sobre</p>
					</Typography>

                    <TextField sx={{minWidth: '18rem', width: '40%'}}
                        label="Sobre"
                        placeholder="Conte sobre você"
                        multiline
                        rows={6}
                        value={formdata.about.value}
                        onChange={ (event) => onChangeHandler('about', event.target.value, (value) => validator.isLength(value, {max: 1024} ) ) }
                        error={inErrorState('about')}
                        helperText={inErrorState('about') ? 'A biografia deve conter até 1024 caracteres' : ''}
                    />

                    <Box display="flex" gap="2em" flexWrap="wrap" justifyContent="center">
                        <Stack sx={{alignItems: 'center'}}>
                            <Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
                                <p>Esporte</p>
                            </Typography>

                            <List sx={{ maxHeight: '12em', width: '18em', bgcolor: 'background.overlay', overflowY: 'scroll', overflowX: 'hidden', borderRadius: '0.5em' }}>
                                <RadioGroup value={formdata.sport.value}>
                                    {Object.keys(sports).map((key) => {
                                        const labelId = 'radio-sports-label-' + sports[key].id;

                                        return (
                                        <ListItem
                                            key={key}
                                            secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <Icon>{sports[key].mui_icon}</Icon>
                                            </IconButton>
                                            }
                                            disablePadding >
                                            <ListItemButton role={undefined} onClick={() => onChangeHandler('sport', sports[key].id) }>
                                            <ListItemIcon>
                                                <Radio
                                                    value={sports[key].id}
                                                    edge="start"
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={(event) => onChangeHandler('sport', event.target.value) }
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={sports[key].title} />
                                            </ListItemButton>
                                        </ListItem>
                                        );
                                    })}
                                </RadioGroup>
                            </List>
            
                        </Stack>

                        <Stack sx={{alignItems: 'center'}}>
                            <Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
                                <p>Gênero da equipe</p>
                            </Typography>

                                    
                            <RadioGroup value={formdata.gender.value} 

                                sx={{ gap: '1em', padding: '1em', maxHeight: '12em', width: '18em', bgcolor: 'background.overlay', overflowY: 'scroll', overflowX: 'hidden', borderRadius: '0.5em' }}>
                                <FormControlLabel label={"Utilizar gênero " + (userdata.gender === 'm' ? 'masculino' : "feminino")} control={
                                        <Radio 
                                            value={userdata.gender}
                                            onClick={(event) => onChangeHandler('gender', event.target.value)}
                                        />
                                    }/>

                                <FormControlLabel label="Utilizar gênero misto" control={
                                    <Radio 
                                        value="o"
                                        onClick={(event) => onChangeHandler('gender', event.target.value)}
                                    />
                                }/>

                            </RadioGroup>
                            

                        </Stack>
                    </Box>
                    <LoadingButton loading={isLoading} onClick={updateTeamdata} endIcon={<Edit />} sx={{marginTop: '2em'}} disabled={!formvalid} size="large" variant="contained">salvar alterações</LoadingButton>

				</Stack>
			</Box>
		);
	}
	else
        return (<Loading />)
}

export default Teamedit;
