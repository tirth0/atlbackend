const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const homeRoutes = require('./routes/homeRoutes');
const keys = require('./config/keys');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoDB.connectionURI,{useNewUrlParser : true, useUnifiedTopology : true}, ()=>{
    console.log('connected to DB');
});

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
app.use('/',homeRoutes);



app.listen(8080,()=>{
    console.log(`backend running`);
});
