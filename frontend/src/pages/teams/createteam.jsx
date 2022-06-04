import { useEffect, useState, useContext, useRef } from 'react';
import { useTheme, Box, Stack, Avatar, Typography, TextField, IconButton, List, ListItem, Checkbox, ListItemText, ListItemIcon, ListItemButton, Icon } from '@mui/material';
import { Edit } from '@mui/icons-material';
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
            <Box height="100%" width="100%" display="flex">
                <Dashboard sx={{ position: 'fixed' }} useDefault={true}></Dashboard>

                <Stack direction="column" sx={{ padding: '2rem', paddingTop: '0', flexGrow: 1, overflowWrap: 'break-all', alignItems: 'center' }}>

                    <Typography fontWeight="bold" variant="h4" component="div" sx={{ marginY: '1rem', color: theme.palette.common.white }}>
                        <p>Criar time</p>
                    </Typography>
                </Stack>
            </Box>
        )
    }
}

export default Createteam