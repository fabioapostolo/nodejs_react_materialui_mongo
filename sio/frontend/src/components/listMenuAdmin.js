import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Description from '@material-ui/icons/Description';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Axios from 'axios';
import {getToken, logout} from '../services/auth';
export const mainListItems = (
  <div>
    <ListItem button component="a" button href="/admin">     
      <ListItemIcon>       
        <DashboardIcon /> 
        </ListItemIcon>
        <ListItemText primary="Dashboard"  />
      </ListItem>
    <ListItem button component="a" href="/admin/usuarios">
    <ListItemIcon>     
        <PeopleIcon /> 
    </ListItemIcon >     
      <ListItemText primary="Usuários"/>
    </ListItem>
    <ListItem button component="a" button href="/admin/fornecedores">
      <ListItemIcon>
        <PeopleIcon /> 
        </ListItemIcon>
        <ListItemText primary="Fornecedores"/>
      </ListItem>  
    <ListItem button component="a" href="/admin/produtos">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos"/>
    </ListItem>
        
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>   
   
  </div>
);

async function confirmSair(){
  if(window.confirm("Deseja realmente sair do sistema?")){
    const response = await Axios.get("http://localhost:5000/api/usuarios/destroytoken",{headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href = '/'
    }else{
      alert("Não foi possível fazer o logout!");
    }
  }
}