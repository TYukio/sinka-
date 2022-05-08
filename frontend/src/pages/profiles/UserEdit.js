import { useEffect, useState, useContext, useRef } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, TextField, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../util/contexts';
import LoadingButton from '@mui/lab/LoadingButton';
import formvalidation from '../../util/formvalidation';
import validator from 'validator'
import Dashboard from '../../components/profiles/Dashboard';
import Loading from '../../components/Loading';

function User(props) {
    const [formdata, setFormdata] = useState({
        name: { value: '', err: false, touched: false },
        biography: { value: null, err: false, touched: false  }
    });
    const [formvalid, setFormvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
	const [userdata, setUserdata] = useState(null);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(null);
    const avatarBrowser = useRef(null);
	const navigate = useNavigate()
	const theme = useTheme();

	const session_uid = useContext(SessionContext);

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);

    // Backend
    function fetchUserdata()
    {
		if (session_uid === null)
            return;

        fetch('/userdata/fetchpublic?id=' + session_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) { 
                response.json().then((json) => {
                    setUserdata(json);
                    setFormdata(
                        {
                            name: { value: json.full_name, err: false, touched: false},
                            biography: { value: json.biography || '', err: false, touched: false},
                        }
                    )       
                });
            }
        });
    }

    function updateUserdata()
    {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", formdata.name.value);
        formData.append("biography", formdata.biography.value);

        if (avatarSelection !== null)
            formData.append("avatar", avatarSelection);
            
        fetch('/userdata/update', {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        }).then(response => {
            setIsLoading(false);
            if (response.ok) { 
                navigate('/user/' + session_uid);
            }
            // TODO checagem de erros mínima
        });
    }

	/*eslint-disable */
	useEffect(() => {fetchUserdata();}, [session_uid]);
    useEffect(formValidateEffect, [formdata]);
	/*eslint-enable */

	if (userdata)
	{
		return (
			<Box sx={{width:'100vw', display: 'flex'}}>
				<Dashboard useDefault={true} />

				<Stack direction="column" sx={{padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

                    <Typography fontWeight="bold" variant="h4" component="div" sx={{marginY: '1rem', color: theme.palette.common.white}}>
                        <p>Editar perfil Sinka</p>
                    </Typography>
					
                    <Box display="flex" justifyContent="center" flexWrap="wrap" alignItems="center" spacing="1em" sx={{maxWidth: '75%'}}>

                    <IconButton onClick={()=> avatarBrowser.current.click()} onMouseEnter={() => setAvatarEdit(true)} onMouseLeave={() => setAvatarEdit(false)}>
                        <Avatar
                            src={avatarSelection !== null ? URL.createObjectURL(avatarSelection) : `/images/pfp/${session_uid}.jpg`}
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
                        value={formdata.biography.value}
                        onChange={ (event) => onChangeHandler('biography', event.target.value, (value) => validator.isLength(value, {max: 1024} ) ) }
                        error={inErrorState('biography')}
                        helperText={inErrorState('biography') ? 'A biografia deve conter até 1024 caracteres' : ''}
                    />
                    
                    <LoadingButton loading={isLoading} onClick={updateUserdata} endIcon={<Edit />} sx={{marginTop: '2em'}} disabled={!formvalid} size="large" variant="contained">salvar alterações</LoadingButton>

				</Stack>
			</Box>
		);
	}
	else
        return (<Loading />)
}

export default User;
