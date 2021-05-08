import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { setNomeUsuario, login, setIdUsuario} from '../../../services/auth';
import Logo from '../../../assets/img/sio.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/fabio.marcelo.7796">
        Fábio M. Apóstolo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    fontSize: 'default'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email_usuario, setEmail] = useState('');
  const [senha_usuario, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    await Axios.post('http://localhost:5000/api/usuarios/login', { email_usuario, senha_usuario })
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            login(res.data.token);
            setIdUsuario(res.data.id_usuario);
            setNomeUsuario(res.data.nome_usuario);

            window.location.href = '/admin'
          } else if (res.data.status === 2) {
            alert('Atenção! :' + res.data.error);
          }
          setLoading(false);
        } else {
          alert('Erro ao acessar o servidor');
          setLoading(false);
        }
      })
  }

  function loadSubmit() {
    setLoading(true);
    setTimeout(
      () => handleSubmit(),
      2000
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>        
      <img src={Logo} alt="logo" width="270" height="100" />
        <Avatar className={classes.avatar}>        
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email_usuario}
          onChange={e => setEmail(e.target.value)}
        />        

        <FormControl variant="outlined" style={{ width: '100%', marginTop: 10 }}>
          <InputLabel htmlFor="campoSenha">Digite sua senha</InputLabel>
          <OutlinedInput
            id="campoSenha"
            type={showPassword ? 'text' : 'password'}
            value={senha_usuario}
            onChange={e => setSenha(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={e => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={120}
          />
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loadSubmit}
          disabled={loading}
        >
         {loading?<CircularProgress />:"ENTRAR"}
          </Button>

      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}