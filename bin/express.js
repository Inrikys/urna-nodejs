const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables')

// Routers
const electionRouter = require('../routes/election-router');
const securityRouter = require('../routes/security-router');


// Invocando express
const app = express(variables.Api.port);


// Configuração de parse do Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Conexão com o banco de dados
mongoose.connect(variables.Database.connection);

// Configurando as rotas
app.use('/urna/election', electionRouter);
app.use('/urna/security', securityRouter);


module.exports = app;