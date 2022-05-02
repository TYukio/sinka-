import { useState } from 'react';
import { Grid, TextField, InputAdornment, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AccountCircle, Email, Password } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Form from '../../components/forms/Form';

function Signup() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passrepeat, setPassrepeat] = useState('');
    const [birth, setBirth] = useState(new Date());
    const [gender, setGender] = useState('');

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
                        onChange={ (event) => setName(event.target.value) }
                        value={name}
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
                        onChange={ (event) => setEmail(event.target.value) }
                        value={email}
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
                        onChange={ (event) => setPass(event.target.value) }
                        value={pass}
                    />

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
                        onChange={ (event) => setPassrepeat(event.target.value) }
                        value={passrepeat}
                    />

                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(props) => <TextField {...props} fullWidth />}
                            label="Data de nascimento"
                            inputFormat="dd/MM/yyyy"
                            onChange={ (date, keyboardInputValue) => setBirth(date) }
                            value={birth}
                        />
                    </LocalizationProvider>
                    

                    <FormControl sx={{alignItems: 'start'}}>
                        <FormLabel id="lbl-gender-radio-buttons-group">Gênero</FormLabel>
                        <RadioGroup row name="gender-radio-buttons-group" aria-labelledby="lbl-gender-radio-buttons-group" onChange={ (event) => setGender(event.target.value) } value={gender}>
                            <FormControlLabel value="female" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="other" control={<Radio />} label="Outro" />
                        </RadioGroup>
                    </FormControl>

                    <Button fullWidth size="large" variant="contained">Criar conta</Button>

                </Form>
            </Grid >
        </>
    );
}
  
export default Signup;
