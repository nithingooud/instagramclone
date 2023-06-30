const express = require('express')
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const PORT = 5000;
const {User} = require('./db/models/user')
const {Post} = require('./db/models/post.model')
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

require('./db/models/post.model')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT,(req,res)=>{
    console.log("server is running on PORT",PORT);
})