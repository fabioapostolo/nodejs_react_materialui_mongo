import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';
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

export default function EditarProdutos() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [qtde, setQtde] = useState('');  

  const {idProduto} = useParams();

  useEffect(() => {
    async function getProduto(){
      var result = await Axios.get('http://localhost:5000/api/produtos/detalhes/'+idProduto);
      
      setNome(result.data.nome_produto);
      setDescricao(result.data.descricao_produto);
      setPreco(result.data.preco_produto);
      setQtde(result.data.qtde_produto);
    }
    getProduto();
  },[])

   async function handleSubmit(e){
     e.preventDefault();
    const data = 
        {nome_produto: nome,
         descricao_produto: descricao, 
         preco_produto: preco, 
         qtde_produto: qtde,
         _id:idProduto};

         if(nome!==''&&descricao!==''&&preco!==''&&qtde!==''){
          const response = await Axios.put('http://localhost:5000/api/produtos', data);
         
          if(response.status===200){
            window.location.href='/admin/produtos'
          }else{
            alert('Erro ao editar o produto!');
          }
        }else{
          alert('Por favor, preencha todos os dados!');
        }   
              
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Editar Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descrição"
                      fullWidth
                      autoComplete="descricao"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>                  
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="preco"
                      required
                      id="preco"
                      name="preco"
                      label="Preço"
                      fullWidth
                      autoComplete="preco"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="qtde"
                      required
                      id="qtde"
                      name="qtde"
                      label="Quantidade"
                      fullWidth
                      autoComplete="qtde"
                      value={qtde}
                      onChange={e => setQtde(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color = "primary">
                   Editar
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
