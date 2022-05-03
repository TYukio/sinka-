import { useState, useEffect } from 'react';
import { Grid, TextField, InputAdornment, Button, FormLabel , Link } from '@mui/material';
import { Email, Password } from '@mui/icons-material';
import validator from 'validator'
import formvalidation from '../../util/formvalidation';
import Form from '../../components/forms/Form';

function Signup() { 
    const [formdata, setFormdata] = useState({
        email: { value: '', err: true, touched: false  },
        pass: { value: '', err: true, touched: false  }
    });
    const [formvalid, setFormvalid] = useState(false)

    const formValidateEffect = formvalidation.formValidateEffect.bind(null, formdata, setFormvalid);
    const onChangeHandler = formvalidation.onChangeHandler.bind(null, formdata, setFormdata);
    const inErrorState = formvalidation.inErrorState.bind(null, formdata);

    // eslint-disable-next-line
    useEffect(formValidateEffect, [formdata]);

    return (
        <>
            <Grid container direction="column" alignItems="center">
                <Form title="Entrar no Sinka">

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
                        onChange={ (event) => onChangeHandler('pass', event.target.value, (value) => value !== '' ) }
                        value={formdata.pass.value}
                        error={inErrorState('pass')}
                        helperText={inErrorState('pass') ? 'Insira sua senha' : ''}
                    />

                    <Button disabled={!formvalid} fullWidth size="large" variant="contained">Entrar</Button>
                    
                    <Grid container direction="row" alignItems="center" spacing={'0'} sx={{ fontSize:'0.75rem'}}>
                        <FormLabel sx={{ mr:'0.2rem', fontSize:'0.75rem'}}>Ainda não possuí conta?</FormLabel>
                        <Link href="/registre-se" underline="hover">{'Registre-se'}</Link>
                    </Grid>
                        
                </Form>
            </Grid >
        </>
    );
}
  
export default Signup;
