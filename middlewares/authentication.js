const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['token'];

    if (token) {
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            req.loggedIn = decoded;
            next();
        } catch (error) {
            res.status(401).send({message: 'Token informado inválido: ' + error})
            return;
        }
    } else {
        res.status(401).send({messaeg: 'Você precisa informar um token para acessar esse recurso'});
        return;
    }

}