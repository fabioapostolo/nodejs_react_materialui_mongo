import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Axios from 'axios';

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },  
}));

export default function ProdutosListagem() {  
  const classes = useStyles();  

  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    async function loadProdutos(){
      const response = await Axios.get('http://localhost:5000/api/produtos');
      setProdutos(response.data);
    }
    loadProdutos();
  },[]);

  async function handleDelete(id){
    if(window.confirm("Tem certeza que deseja excluir?")){
      var result = await Axios.delete('http://localhost:5000/api/produtos/' +id);
      if(result.status === 200){
        window.location.href='/admin/produtos';
      }else{
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>         
      <MenuAdmin title={'PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1} justify="center">  
            <Grid item sm={12}>
            <Paper className={classes.paper}>
                <h2>Listagem de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}> 
                  <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>            
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Preço</TableCell>
            <TableCell align="center">Quantidade</TableCell>
            <TableCell align="center">Data Cadastro</TableCell>
            <TableCell align="center">Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.nome_produto}
              </TableCell>
              <TableCell align="center">{row.descricao_produto}</TableCell>
              <TableCell align="center">{row.preco_produto}</TableCell>
              <TableCell align="center">{row.qtde_produto}</TableCell>              
              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
              <TableCell>
              <ButtonGroup aria-label="outlined primary button group">
              <Button color="default" href={'/admin/produtos/cadastrar'}>Adicionar</Button>
                <Button color="primary" href={'/admin/produtos/editar/'+row._id}>Editar</Button>
                <Button color="secondary" onClick={()=>handleDelete(row._id)}>Excluir</Button>                 
              </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>                  
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



