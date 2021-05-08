const Usuario = require('../model/usuarioModel');
const jwt = require('jsonwebtoken');
const secret = "clb88ppqqrs";

module.exports = {
    async listarTodos(req,res){
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req,res){
        const {nome_usuario, email_usuario, tipo_usuario,senha_usuario} = req.body;
        let data = {};
        let user =  await Usuario.findOne({email_usuario});
        
        if(!user){
            data = {nome_usuario,email_usuario,tipo_usuario,senha_usuario};
            user = await Usuario.create(data);
            return res.status(200).json(user);
        }else{
            return res.status(500).json(user);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req,res){
        const { _id } = req.params;
        const user = await Usuario.findByIdAndDelete({_id});
        return res.json(user);
    },
    async update(req,res){
        const { _id, nome_usuario, email_usuario, senha_usuario,tipo_usuario } = req.body;
        const data = {nome_usuario,email_usuario,senha_usuario,tipo_usuario};
        const user = await Usuario.findByIdAndUpdate({_id},data,{new:true});
        res.json(user);
    },
    async login(req,res){
        const { email_usuario, senha_usuario } = req.body;
        Usuario.findOne({email_usuario: email_usuario, tipo_usuario:1}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
            }else if (!user){
                res.status(200).json({status:2, error: 'E-mail não encontrado no Banco de Dados!'});
            }else{
                user.isCorrectPassword(senha_usuario, async function(err,same){
                    if(err){
                        res.status(200).json({error: 'Erro no servidor, por favor tente novamente!'});                        
                    }else if(!same){
                        res.status(200).json({status:2, error: 'Senha incorreta!'})
                    }else{
                        const payload = {email_usuario};
                        const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                })
                res.cookie('token', token, {httpOnly: true});
                res.status(200).json({status:1, auth:true, token:token, id_usuario: user._id, nome_usuario: user.nome_usuario});  

                    }
                })
                             
            }              
            
        })
    },

    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];        
        if(!token){
            res.json({status:401,msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401,msg:'Não autorizado: Token inválido!'});
                }else{
                    res.json({status:200})
                }
            })
        }
    },

    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token',null,{httpOnly:true});
        }else{
            res.status(401).send("Logout não autorizado!")
        }
        res.send("Sessão finalizada com sucesso!");
    }
}   
    



    
        

 