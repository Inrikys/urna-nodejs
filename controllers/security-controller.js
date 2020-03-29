'use strict'

const repository = require('../repositories/security-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

const _repo = new repository();

function securityController() {

}

securityController.prototype.authenticate = async (req, res) => {
    let _validationContract = new validation();

    // Validate
    _validationContract.isRequired(req.body.email, 'Informe seu email');
    _validationContract.isRequired(req.body.password, 'Informe seu senha');

    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Não foi possivel efetuar o login', validation: _validationContract.errors()});
        return;
    }

    let authenticatedUser = await _repo.authenticate(req.body.email, req.body.password);
    if(authenticatedUser){
        res.status(200).send({
            user: authenticatedUser,
            token: jwt.sign({user: authenticatedUser}, variables.Security.secretKey)
        })
    } else {
        res.status(404).send({message: 'Dados inválidos'});
    }
}

securityController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
}


securityController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
}


securityController.prototype.post = async (req, res) => {

    let _validationContract = new validation();

    // Validate Name
    _validationContract.isRequired(req.body.name, 'Informe seu nome');

    // Validate CPF (sem validar se cpf é valido, apenas se foi passado)
    _validationContract.isRequired(req.body.cpf, 'Informe seu CPF');

    // Validate E-mail
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'Insira um e-mail válido');

    // Validate Password
    _validationContract.isRequired(req.body.password, 'Senha obrigatória');
    _validationContract.isRequired(req.body.confirmationPassword, 'Senha de confirmação obrigatória');
    _validationContract.isTrue(req.body.password != req.body.confirmationPassword, "Senha de confirmação deve ser igual a senha");


    // Validate if E-mail already exist
    let emailAlreadyExist = await _repo.emailAlreadyExist(req.body.email);
    if (emailAlreadyExist) {
        _validationContract.isTrue(emailAlreadyExist.name != undefined, `O e-mail ${req.body.email} já está sendo usado`);
    }

    // Encrypt password
    req.body.password = md5(req.body.password);

    ctrlBase.post(_repo, _validationContract, req, res);

}


securityController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    // Validates
    _validationContract.isRequired(req.params.id, 'É necessário passar o ID como parâmetro');

    if (req.body.name) {
        _validationContract.isRequired(req.body.name, 'Informe seu nome');
    }

    if (req.body.cpf) {
        _validationContract.isRequired(req.body.cpf, 'Informe seu CPF');
    }

    // Validate if E-mail already exist
    if (req.body.email) {

        _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
        _validationContract.isEmail(req.body.email, 'Insira um e-mail válido');

        let emailAlreadyExist = await _repo.emailAlreadyExist(req.body.email);
        if (emailAlreadyExist) {
            _validationContract.isTrue((emailAlreadyExist.name != undefined)
                && (emailAlreadyExist._id != req.params.id),
                `O e-mail ${req.body.email} já está sendo usado`);
        }
    }


    if (req.body.password) {
        // Encrypt password
        req.body.password = md5(req.body.password);
    }

    ctrlBase.put(_repo, _validationContract, req, res);

}


securityController.prototype.delete = async (req, res) => {

    ctrlBase.delete(_repo, req, res);

}


module.exports = securityController;