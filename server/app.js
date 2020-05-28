const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

//Подключение к облаку с данными
mongoose.connect('mongodb+srv://Alex:<dev2020>@cluster0-plbdz.gcp.mongodb.net/test?retryWrites=true&w=majorityl', { useMongoClient: true });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Проверка на подключение к БД
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});