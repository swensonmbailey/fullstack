const express = require('express');
const app = express();
const mongoose = require('mongoose');



app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

app
 .use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
 })
 .use('/', require('./server/routes'));




process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


app.listen(process.env.PORT || port);


async function connectToDb() {
  
  try{
    await mongoose.connect('mongodb+srv://swensonmbailey:masmagic06@cluster0.8gj1ju1.mongodb.net/CMS?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to database!');
  }
  catch(err){
    console.log('Connection failed: ' + err);
  }
} 

connectToDb();






