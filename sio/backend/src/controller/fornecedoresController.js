const Fornecedor = require('../model/fornecedoresModel');

module.exports = {
    async listarTodos(req,res){
        const forn = await Fornecedor.find();
        res.json(forn);
    },
    async create(req,res){
        const {razao_social, nome_fantasia, cnpj, ie, cep, rua, numero, bairro, cidade, estado,fixo, celular, email} = req.body;
        let data = {};
        let forn =  await Fornecedor.findOne({razao_social});
        
        if(!forn){
            data = {razao_social, nome_fantasia, cnpj, ie, cep, rua, numero, bairro, cidade, estado,fixo, celular, email};
            forn = await Fornecedor.create(data);
            return res.status(200).json(forn);
        }else{
            return res.status(500).json(forn);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const forn = await Fornecedor.findOne({_id});
        res.json(forn);
    },
    async delete(req,res){
        const { _id } = req.params;
        const forn = await Fornecedor.findByIdAndDelete({_id});
        return res.json(forn);
    },
    async update(req,res){
        const { _id, razao_social, nome_fantasia, cnpj, ie, cep, rua, numero, bairro, cidade, estado,fixo, celular, email} = req.body;
        const data = {razao_social, nome_fantasia, cnpj, ie, cep, rua, numero, bairro, cidade, estado,fixo, celular, email};
        const forn = await Fornecedor.findByIdAndUpdate({_id},data,{new:true});
        res.json(forn);
    }
   
}
 