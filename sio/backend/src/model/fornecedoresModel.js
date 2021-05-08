const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    razao_social:String,
    nome_fantasia: String,
    cnpj: String,
    ie: String,
    cep: String,
    rua:String,
    numero: String,
    bairro: String,
    cidade: String,    
    estado: String,
    fixo: String, 
    celular: String,
    email: String    
},{
    timestamps:true
});

const fornecedores = mongoose.model('Fornecedores',DataSchema);
module.exports = fornecedores;