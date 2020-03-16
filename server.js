'use strict'

const app = require('../Urna/bin/express');
const variables = require ('../Urna/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.log('Servidor Urna Api iniciado na porta ' + variables.Api.port);
})

