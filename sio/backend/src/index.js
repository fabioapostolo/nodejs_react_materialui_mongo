const express = require('express');
const cors = require('cors');
const app = express();
const mongoose  = require('./config/database');
const port = process.env.PORT || 5000;
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use('/', routes); //minha url base


app.listen(port,function(){
    console.log(`Server runing on port ${port}`)
});




