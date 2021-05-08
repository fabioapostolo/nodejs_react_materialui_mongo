import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',

  }
}));

export default function EditarFornecedores() {
  const classes = useStyles();

  const [razao_social, setRazao_social] = useState('');
  const [nome_fantasia, setNome_fantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ie, setIe] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');  
  const [estado, setEstado] = useState('');
  const [fixo, setFixo] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState(''); 

  const {idFornecedor} = useParams();

  useEffect(() => {
    async function getFornecedor(){
      var result = await Axios.get('http://localhost:5000/api/fornecedores/detalhes/'+idFornecedor);
      
      setRazao_social(result.data.razao_social);
      setNome_fantasia(result.data.nome_fantasia);
      setCnpj(result.data.cnpj);
      setIe(result.data.ie);
      setCep(result.data.cep);
      setRua(result.data.rua);
      setNumero(result.data.numero);
      setBairro(result.data.bairro);
      setCidade(result.data.cidade);
      setEstado(result.data.estado);
      setFixo(result.data.fixo);
      setCelular(result.data.celular);
      setEmail(result.data.email);
    }
    getFornecedor();
  },[])

   async function handleSubmit(e){
     e.preventDefault();
    const data = 
        {razao_social: razao_social,
            nome_fantasia:nome_fantasia,
            cnpj: cnpj,
            ie: ie,
            cep: cep,
            rua: rua, 
            numero: numero, 
            bairro: bairro,
            cidade: cidade,         
            estado: estado,
            fixo: fixo,
            celular: celular,
            email: email,
            _id: idFornecedor};

         if(razao_social!==''&& nome_fantasia!=='' && cnpj!=='' && ie!=='' &&cep!=='' && rua!==''&&numero!==''&&bairro!=='' &&cidade!==''&&estado!=='' &&fixo!=='' &&celular!=='' &&email!==''){
          const response = await Axios.put('http://localhost:5000/api/fornecedores', data);
         
          if(response.status===200){
            window.location.href='/admin/fornecedores'
          }else{
            alert('Erro ao editar o Fornecedor!');
          }
        }else{
          alert('Por favor, preencha todos os dados!');
        }   
              
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'FORNECEDORES'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Fornecedores</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="razao_social"
                      name="razao_social"
                      label="Razão Social"
                      fullWidth
                      autoComplete="razao_social"
                      value={razao_social}
                      onChange={e => setRazao_social(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome_fantasia"
                      name="nome_fantasia"
                      label="Nome Fantasia"
                      fullWidth
                      autoComplete="nome_fantasia"
                      value={nome_fantasia}
                      onChange={e => setNome_fantasia(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="cnpj"
                      name="cnpj"
                      label="CNPJ"
                      fullWidth
                      autoComplete="cnpj"
                      value={cnpj}
                      onChange={e => setCnpj(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="ie"
                      name="ie"
                      label="Inscr.Estadual"
                      fullWidth
                      autoComplete="ie"
                      value={ie}
                      onChange={e => setIe(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="cep"
                      required
                      id="cep"
                      name="cep"
                      label="CEP"
                      fullWidth
                      autoComplete="cep"
                      value={cep}
                      onChange={e => setCep(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="rua"
                      name="rua"
                      label="Rua"
                      fullWidth
                      autoComplete="rua"
                      value={rua}
                      onChange={e => setRua(e.target.value)}
                    />
                  </Grid>                  
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="numero"
                      required
                      id="numero"
                      name="numero"
                      label="Número"
                      fullWidth
                      autoComplete="numero"
                      value={numero}
                      onChange={e => setNumero(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="bairro"
                      required
                      id="bairro"
                      name="bairro"
                      label="Bairro"
                      fullWidth
                      autoComplete="bairro"
                      value={bairro}
                      onChange={e => setBairro(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="cidade"
                      required
                      id="cidade"
                      name="cidade"
                      label="Cidade"
                      fullWidth
                      autoComplete="cidade"
                      value={cidade}
                      onChange={e => setCidade(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="labelEstado">Estado</InputLabel>
                    <Select
                      labelId="labelEstado"
                      id="estado"
                      value={estado}
                      onChange={e => setEstado(e.target.value)}
                    >
                      <MenuItem value={1}>AC</MenuItem>
                      <MenuItem value={2}>AL</MenuItem>
                      <MenuItem value={3}>AP</MenuItem>
                      <MenuItem value={4}>AM</MenuItem>
                      <MenuItem value={5}>BA</MenuItem>
                      <MenuItem value={6}>CE</MenuItem>
                      <MenuItem value={7}>DF</MenuItem>
                      <MenuItem value={8}>ES</MenuItem>
                      <MenuItem value={9}>GO</MenuItem>
                      <MenuItem value={10}>MA</MenuItem>
                      <MenuItem value={11}>MT</MenuItem>
                      <MenuItem value={12}>MS</MenuItem>
                      <MenuItem value={13}>MG</MenuItem>
                      <MenuItem value={14}>PA</MenuItem>
                      <MenuItem value={15}>PB</MenuItem>
                      <MenuItem value={16}>PR</MenuItem>
                      <MenuItem value={17}>PE</MenuItem>
                      <MenuItem value={18}>PI</MenuItem>
                      <MenuItem value={19}>RJ</MenuItem>
                      <MenuItem value={20}>RN</MenuItem>
                      <MenuItem value={21}>RS</MenuItem>
                      <MenuItem value={22}>RO</MenuItem>
                      <MenuItem value={23}>RR</MenuItem>
                      <MenuItem value={24}>SC</MenuItem>
                      <MenuItem value={25}>SP</MenuItem>
                      <MenuItem value={26}>SE</MenuItem>
                      <MenuItem value={27}>TO</MenuItem>                      
                    </Select>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="fixo"
                      required
                      id="fixo"
                      name="fixo"
                      label="Telefone Fixo"
                      fullWidth
                      autoComplete="fixo"
                      value={fixo}
                      onChange={e => setFixo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="celular"
                      required
                      id="celular"
                      name="celular"
                      label="Celular"
                      fullWidth
                      autoComplete="celular"
                      value={celular}
                      onChange={e => setCelular(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="email"
                      required
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color = "primary">                      
                   Salvar                  
                  </Button> 
                  </Grid>                  
                </Grid>
              </Paper>
            </Grid>

          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}