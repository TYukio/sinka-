import { useEffect, useState, useContext, useRef } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, TextField, IconButton, List, ListItem, Checkbox, ListItemText, ListItemIcon, ListItemButton, Icon } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SessionContext, HostContext } from '../../util/contexts';
import LoadingButton from '@mui/lab/LoadingButton';
import formvalidation from '../../util/formvalidation';
import validator from 'validator'
import Dashboard from '../../components/dashboard/Dashboard';
import Loading from '../../components/Loading';


function Createteam(props) {
    const [formdata, setFormdata] = useState({
        name: { value: '', err: false, touched: false },
        biography: { value: null, err: false, touched: false },
        usertypes: { value: new Set(), err: false, touched: false },
        sports: { value: new Set(), err: false, touched: false }
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

    const [userTypes, setUserTypes] = useState({});
    const [sports, setSports] = useState({});

    // Backend
    const hostname = useContext(HostContext);

    function fetchUserdata() {
        if (session_uid === null)
            return;

        fetch(hostname + 'userdata/fetchpublic?id=' + session_uid, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then((json) => {
                    setUserdata(json);
                    setFormdata(
                        {
                            ...formdata,
                            name: { value: json.full_name, err: false, touched: false },
                            biography: { value: json.biography || '', err: false, touched: false },
                            usertypes: { value: new Set(json.types), err: false, touched: false },
                            sports: { value: new Set(json.sports), err: false, touched: false }
                        }
                    )
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

    function updateUserdata() {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", formdata.name.value);
        formData.append("biography", formdata.biography.value);
        formData.append("types", [...formdata.usertypes.value]);
        formData.append("sports", [...formdata.sports.value]);

        if (avatarSelection !== null)
            formData.append("avatar", avatarSelection);

        fetch(hostname + 'userdata/update', {
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
    useEffect(() => { fetchUserdata(); fetchDatafields(); }, [session_uid]);
    useEffect(formValidateEffect, [formdata]);
    /*eslint-enable */

    if (userdata) {
        return (
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Dashboard useDefault={true} />

                <Stack direction="column" sx={{ padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

                    <Typography fontWeight="bold" variant="h4" component="div" sx={{ marginY: '1rem', color: theme.palette.common.white }}>
                        <p>Criar Time</p>
                    </Typography>

                    <Box display="contents" justifyContent="center" flexWrap="wrap" alignItems="center" spacing="1em" sx={{ maxWidth: '75%' }}>

                        <IconButton onClick={() => avatarBrowser.current.click()} onMouseEnter={() => setAvatarEdit(true)} onMouseLeave={() => setAvatarEdit(false)}>
                            <Avatar
                                src={avatarSelection}
                                sx={{ width: '8em', height: '8em' }}
                            />
                            <Edit sx={{ position: 'absolute', display: avatarEdit ? 'auto' : 'none' }} />
                            <input
                                ref={avatarBrowser}
                                onChange={(event) => setAvatarSelection(event.target.files[0])}
                                type="file"
                                accept="image/*"
                                hidden
                            />
                        </IconButton>

                        <TextField label="Nome do Time" variant="standard" sx={{ width: '14rem', paddingBottom: '1em', ml: '1em', mt: '1em', }}
                            value={formdata.name.value} onChange={(event) => onChangeHandler('name', event.target.value, (value) => validator.isLength(value, { min: 4, max: 64 }))}
                            error={inErrorState('name')} helperText={inErrorState('name') ? 'O nome deve conter entre 4 e 64 caracteres' : ''} />
                    </Box>


                    <Box display="flex" gap="2em" flexWrap="wrap" justifyContent="center">


                        <Stack sx={{ alignItems: 'center' }}>
                            <Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
                                <p>Esportes</p>
                            </Typography>

                            <List sx={{ maxHeight: '12em', width: '18em', bgcolor: 'background.overlay', overflowY: 'scroll', overflowX: 'hidden', borderRadius: '0.5em' }}>
                                {Object.keys(sports).map((key) => {
                                    const labelId = 'checkbox-sports-label-' + sports[key].id;

                                    return (
                                        <ListItem
                                            key={key}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                    <Icon>{sports[key].mui_icon}</Icon>
                                                </IconButton>
                                            }
                                            disablePadding >
                                            <ListItemButton role={undefined} onClick={() => {
                                                var updatedset = new Set(formdata.sports.value);
                                                if (formdata.sports.value.has(sports[key].id))
                                                    updatedset.delete(sports[key].id);
                                                else
                                                    updatedset.add(sports[key].id);

                                                onChangeHandler('sports', updatedset);
                                            }}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={formdata.sports.value.has(sports[key].id)}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        onChange={(event) => {
                                                            var updatedset = new Set(formdata.sports.value);
                                                            if (event.target.checked)
                                                                updatedset.add(sports[key].id);
                                                            else
                                                                updatedset.delete(sports[key].id);

                                                            onChangeHandler('sports', updatedset);
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={sports[key].title} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>

                        </Stack>
                       
                    </Box>
                        <Stack sx={{marginTop:'2em',}}>
                            <Typography>Seu time é misto ?</Typography>
                            <Checkbox/>
                        </Stack>
                    <Typography fontSize="1.125rem" component="div" letterSpacing="0.06em">
                        <p>Sobre</p>
                    </Typography>

                    <TextField sx={{ minWidth: '18rem', width: '40%' }}
                        label="Sobre"
                        placeholder="Conte sobre seu time"
                        multiline
                        rows={6}

                        onChange={(event) => onChangeHandler('biography', event.target.value, (value) => validator.isLength(value, { max: 1024 }))}
                        error={inErrorState('biography')}
                        helperText={inErrorState('biography') ? 'A biografia deve conter até 1024 caracteres' : ''}
                    />



                    <LoadingButton loading={isLoading} onClick={updateUserdata} endIcon={<Add />} sx={{ marginTop: '2em' }} disabled={!formvalid} size="large" variant="contained">Criar</LoadingButton>

                </Stack>
            </Box>
        )
    }
}
export default Createteam