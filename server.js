require('dotenv').config()
const express = require('express');
const app = express();

const mangoose = require('mongoose');

mangoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mangoose.connection;
db.on('error', (err)=>{console.log(err)})
db.once('open', (conc)=>{console.log( " connected")})


//swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument1 = YAML.load('./swagger.yaml');

app.use('/user-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument1));


app.use(express.json())
const empRouter = require('./routers/users')
app.use('/users',empRouter)
const notesRouter = require('./routers/notesRouter')
app.use('/users/notes',notesRouter)
app.listen(3001, ()=> console.log("server started"));

