// Application initilzation

const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./db/mongodb');
const port = process.env.PORT || 8080;

const professionalRoutes = require('./routes/professional');
const contactRoutes = require('./routes/contacts');
const app = express();

app.use(bodyParser.json())
  .use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/professional', professionalRoutes)  
  .use('/contacts', contactRoutes);



mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server started on Port ${port}. open frontend live server to view professional \n`);
    console.log(`ctrl+click http://localhost:${port}/professional`)
    console.log(`ctrl+click http://localhost:${port}/contacts`)
  }
});