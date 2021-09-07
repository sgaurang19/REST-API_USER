require('dotenv').config()
const express = require('express');
const app = express();

const mangoose = require('mongoose');

mangoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mangoose.connection;
db.on('error', (err)=>{console.log(err)})
db.once('open', (conc)=>{console.log( " connected")})

app.use(express.json())
const empRouter = require('./routers/users')
app.use('/users',empRouter)

app.listen(3001, ()=> console.log("server started"));