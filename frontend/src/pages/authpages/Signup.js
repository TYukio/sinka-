import { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, LinearProgress, Fade } from '@mui/material';
import { DatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AccountCircle, Email, Password } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
        gender: { value: 'male', err: false, touched: false  }
    });

    const [passfocus, setPassfocus] = useState(false)
    const [formvalid, setFormvalid] = useState(false)

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);
    const passwordScore = formvalidation.passwordScore.bind(null);

    // eslint-disable-next-line
    useEffect(formValidateEffect, [formdata]);

    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Form title="Junte-se ao Sinka">

                    <TextField
                        label="Nome completo"
                        placeholder="Nome"
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
                        fullWidth
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><Password /></InputAdornment>
                        ),
                        }}
                        variant="outlined"
                        type="password"
                        autoComplete="new-password"
                        onChange={ (event) => onChangeHandler('passrepeat', event.target.value, (value) => validator.equals(value, formdata.pass.value) ) }
                        value={formdata.passrepeat.value}
                        error={inErrorState('passrepeat')}
                        helperText={inErrorState('passrepeat') ? 'As senhas não coencidem' : ''}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            
                            renderInput={(props) => <TextField {...props} error={inErrorState('birth')}
                                helperText={inErrorState('birth') ? 'Insira uma data válida' : ''} fullWidth />}
                            label={"Data de nascimento"}
                            inputFormat="dd/MM/yyyy"
                            minDate={oldDate}
                            maxDate={nowDate}
                            onChange={ (date, kbValue) => onChangeHandler('birth', date, (value) => value != null && value instanceof Date && !isNaN(value)) }
                            value={formdata.birth.value}
                        />
                    </LocalizationProvider>
                    
                    <FormControl sx={{alignItems: 'start'}}>
                        <FormLabel id="lbl-gender-radio-buttons-group">Gênero</FormLabel>
                        <RadioGroup row name="gender-radio-buttons-group" aria-labelledby="lbl-gender-radio-buttons-group" 
                        onChange={ (event) => onChangeHandler('gender', event.target.value, (value) => value !== null) } value={formdata.gender.value}>
                            <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="female" control={<Radio />} label="Feminino" />     
                            <FormControlLabel value="other" control={<Radio />} label="Outro" />
                        </RadioGroup>
                    </FormControl>

                    <Button disabled={!formvalid} fullWidth size="large" variant="contained">Criar conta</Button>

                </Form>
            </Grid >
        </>
    );
}
  
export default Signup;
