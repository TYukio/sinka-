import { useState, useEffect } from 'react';
import { Button, Icon, Grid, TextField, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, LinearProgress, Fade, Link, Stack, Slide, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AccountCircle, Email, Password } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingButton from '@mui/lab/LoadingButton';
import validator from 'validator'
import formvalidation from '../../util/formvalidation';
import Form from '../../components/forms/Form';

function Signup() { 
    const nowDate = new Date();
    const oldDate = (new Date()).setFullYear( nowDate.getFullYear() - 100 );

    const [formdata, setFormdata] = useState({
        name: { value: '', err: true, touched: false },
        email: { value: '', err: true, touched: false  },
        pass: { value: '', err: true, touched: false  },
        passrepeat: { value: '', err: true, touched: false  },
        birth: { value: nowDate, err: false, touched: false  },
        gender: { value: 'male', err: false, touched: false  },
        usertypes: { value: new Set(), err: false, touched: false }
    });

    const [passfocus, setPassfocus] = useState(false);
    const [formvalid, setFormvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usertypeSelection, setUsertypeSelection] = useState({showForm: true, showSelection: false});
    const [alert, setAlert] = useState({text: undefined, severity: undefined});

    const [userTypes, setUserTypes] = useState({});

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);
    const passwordScore = formvalidation.passwordScore.bind(null);

    /*eslint-disable */
    useEffect(formValidateEffect, [formdata]);

    // Tenebroso, mas é o único jeito que eu achei
    useEffect(() => {
        let validpass = formdata.passrepeat.value != formdata.pass.value;
        setFormdata({
            ...formdata,
            passrepeat: {value: formdata.passrepeat.value, err: validpass, touched: formdata.passrepeat.touched}
        })
    }, 
    [formdata.pass.value, formdata.passrepeat.value]);
    /*eslint-enable */

    function setFormMode(selection)
    {
        setAlert({text: undefined, severity: undefined});
        setUsertypeSelection({showForm: !selection, showSelection: selection})
    }

    // Backend
    function fetchSignup()
    {
        setIsLoading(true);  
        fetch('/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: formdata.name.value,
                email: formdata.email.value,
                pass: formdata.pass.value,
                birth: formdata.birth.value,
                gender: formdata.gender.value,
                types: [...formdata.usertypes.value],
            })
        }).then(response => {
            setIsLoading(false);
            if (response.ok) { 
                window.location.href = '/entrar?email=' + encodeURIComponent(formdata.email.value);
            } else {
                setFormMode(false);
                setAlert({text: 'A tentativa de cadastro falhou', severity: 'error'});  
            }
        });
    }

    function fetchValidMail()
    {
        setIsLoading(true);  
        fetch('/auth/emailcheck?email=' + encodeURIComponent(formdata.email.value), {
            method: 'GET',
        }).then(response => {
            setIsLoading(false);
            if (response.ok) { 
                setFormMode(true);
            } else if (response.status === 409) {
                setAlert({text: 'Endereço de e-mail já está em uso', severity: 'error'});
            } else {
                setAlert({text: 'A tentativa de cadastro falhou', severity: 'error'});
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
    }

    /*eslint-disable */
    useEffect(fetchDatafields, []);
    /*eslint-enable */

    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Form title="Junte-se ao Sinka" alert={alert.text} alertseverity={alert.severity} profileOnSession={true}>
                    <Slide direction="right" timeout={{appear: 300, enter: 300, exit: 0}} in={usertypeSelection.showForm} unmountOnExit>
                        <Stack marginY={'1em'} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={'1em'}>
                            <TextField
                                label="Nome completo"
                                placeholder="Nome"
                                disabled={isLoading}
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><AccountCircle /></InputAdornment>
                                ),
                                }}
                                variant="outlined"
                                onChange={ (event) => onChangeHandler('name', event.target.value, (value) => validator.isLength(value, {min: 4, max: 64}) ) }
                                value={formdata.name.value}
                                error={inErrorState('name')}
                                helperText={inErrorState('name') ? 'O nome deve conter entre 4 e 64 caracteres' : ''}
                            />

                            <TextField
                                label="E-mail"
                                placeholder="E-mail"
                                disabled={isLoading}
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><Email /></InputAdornment>
                                ),
                                }}
                                variant="outlined"
                                type="email"
                                onChange={ (event) => onChangeHandler('email', event.target.value, (value) => validator.isEmail(value) ) }
                                value={formdata.email.value}
                                error={inErrorState('email')}
                                helperText={inErrorState('email') ? 'Insira um endereço de e-mail válido' : ''}
                            />

                            <TextField
                                label="Senha"
                                placeholder="Senha"
                                disabled={isLoading}
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><Password /></InputAdornment>
                                ),
                                }}
                                variant="outlined"
                                type="password"
                                autoComplete="new-password"
                                onFocus={ () => setPassfocus(true) }
                                onBlur={ () => setPassfocus(false) }
                                onChange={ (event) => onChangeHandler('pass', event.target.value, (value) => passwordScore(value) > 50 ) }
                                value={formdata.pass.value}
                                error={inErrorState('pass')}
                                helperText={inErrorState('pass') ? 'A senha é muito fraca' : ''}
                            />

                            <Fade in={passfocus} unmountOnExit>
                                <FormControl sx={{alignItems: 'start', width: '95%'}}>
                                    <FormLabel id="lbl-pass-strength-progress">Força da senha</FormLabel>
                                    <LinearProgress sx={{mb: '1em', mt: '0.2em', width: '100%' }} variant="determinate" value={passwordScore(formdata.pass.value)} />
                                </FormControl>
                            </Fade>

                            <TextField
                                label="Verificar senha"
                                placeholder="Redigite a senha"
                                disabled={isLoading}
                                fullWidth
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"><Password /></InputAdornment>
                                ),
                                }}
                                variant="outlined"
                                type="password"
                                autoComplete="new-password"
                                onChange={ (event) => onChangeHandler('passrepeat', event.target.value ) }
                                value={formdata.passrepeat.value}
                                error={inErrorState('passrepeat')}
                                helperText={inErrorState('passrepeat') ? 'As senhas não coencidem' : ''}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker 
                                    renderInput={(props) => <TextField {...props} disabled={isLoading} error={inErrorState('birth')}
                                        helperText={inErrorState('birth') ? 'Insira uma data válida' : ''} fullWidth />}
                                    label={"Data de nascimento"}
                                    inputFormat="dd/MM/yyyy"
                                    minDate={oldDate}
                                    maxDate={nowDate}
                                    onChange={ (date, kbValue) => onChangeHandler('birth', date, (value) => value != null && value instanceof Date && !isNaN(value)) }
                                    value={formdata.birth.value}
                                />
                            </LocalizationProvider>
                            
                            <FormControl disabled={isLoading} sx={{alignItems: 'start', flexWrap: 'nowrap'}}>
                                <FormLabel id="lbl-gender-radio-buttons-group">Gênero</FormLabel>
                                <RadioGroup row name="gender-radio-buttons-group" aria-labelledby="lbl-gender-radio-buttons-group" sx={{flexWrap: 'nowrap'}}
                                onChange={ (event) => onChangeHandler('gender', event.target.value, (value) => value !== null) } value={formdata.gender.value}>
                                    <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                                    <FormControlLabel value="female" control={<Radio />} label="Feminino" />     
                                    <FormControlLabel value="other" control={<Radio />} label="Outro" />
                                </RadioGroup>
                            </FormControl>

                            <LoadingButton loading={isLoading} onClick={fetchValidMail} disabled={!formvalid} fullWidth size="large" variant="contained">Prosseguir</LoadingButton>

                            <Grid container direction="row" alignItems="center" spacing={'0'} sx={{ fontSize:'0.75rem'}}>
                                <FormLabel sx={{ mr:'0.2rem', fontSize:'0.75rem'}}>Já possuí conta?</FormLabel>
                                <Link href="/entrar" underline="hover">{'Entrar'}</Link>
                            </Grid>
                        </Stack>
                    </Slide>


                    <Slide direction="left" timeout={{appear: 300, enter: 300, exit: 0}} in={usertypeSelection.showSelection} unmountOnExit>
                        <Stack marginY={'1em'} direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={'1em'}>
                           
                            <Typography fontSize="1.125rem" component="div" letterSpacing="0.06em" marginY="-1em">
                                <p>Quais tipos de usuário se aplicam à você?</p>
                            </Typography>
                            
                            {Object.keys(userTypes).map((key) => {
                                return (
                                    <Button sx={{height: '2.25rem', width: '75%', justifyContent: 'left'}}
                                        onClick={ () => {
                                            var updatedset = new Set(formdata.usertypes.value);
                                            if (!formdata.usertypes.value.has(userTypes[key].id))
                                                updatedset.add(userTypes[key].id) ;
                                            else
                                                updatedset.delete(userTypes[key].id) ;

                                            onChangeHandler('usertypes', updatedset);
                                        }}
                                        variant={formdata.usertypes.value.has(userTypes[key].id) ? 'contained' : 'outlined'}
                                        color={formdata.usertypes.value.has(userTypes[key].id) ? 'primary' : 'neutral'}
                                        startIcon={<Icon>{userTypes[key].mui_icon}</Icon>}>
                                        
                                        {userTypes[key].title} 
                                    </Button>
                                );
                            })}

                            <LoadingButton loading={isLoading} onClick={fetchSignup} disabled={formdata.usertypes.value.size <= 0} fullWidth size="large" variant="contained">Criar conta</LoadingButton>
                        </Stack>
                        
                    </Slide>
                </Form>
            </Grid >
        </>
    );
}
  
export default Signup;