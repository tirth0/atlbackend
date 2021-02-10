const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const keys = require('./config/keys')

mongoose.connect(keys.mongoDB.connectionURI,{useNewUrlParser : true, useUnifiedTopology : true}, ()=>{
    console.log('connected to DB');
});

app.use('/',homeRoutes);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.listen(8080,()=>{
    console.log(`backend running`);
});
