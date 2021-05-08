const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sio',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
},function (err){
    if(err){
        console.log(err)
    }else{
        console.log('MongoDB CONECTADO com sucesso!')
    }
});