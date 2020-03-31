'use strict'

const app = require('./bin/express');
const variables = require ('./bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.log('Servidor Urna Api iniciado na porta ' + variables.Api.port);
})

