'use strict'

const repository = require('../repositories/election-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function electionController() {

}

electionController.prototype.get = async (req, res) => {

    ctrlBase.get(_repo, req, res);

}


electionController.prototype.getById = async (req, res) => {
    console.log('entrei aqui');

    ctrlBase.getById(_repo, req, res);

}

electionController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.name, "O nome do candidato é obrigatório");
    _validationContract.isRequired(req.body.party, "O partido do candidato é obrigatório");
    _validationContract.isRequired(req.body.number, "O número do candidato é obrigatório");

    ctrlBase.post(_repo, _validationContract, req, res);

}


electionController.prototype.put = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'É necessário passar o ID como parâmetro');

    ctrlBase.put(_repo, _validationContract, req, res);

}


electionController.prototype.delete = async (req, res) => {

    ctrlBase.delete(_repo, req, res);

}

electionController.prototype.vote = async (req, res) => {

    try {

        let id = req.params.id;

        if (id) {
            let data = await _repo.vote(id);
            res.status(200).send(data);
        } else {
            res.status(400).send({ message: 'O parametro id precisa ser informado.' })
        }


    } catch (error) {
        console.log('vote com error: ' + error);
        const errorData = {
            message: 'Erro no processamento',
            error: error
        }
        res.status(500).send(errorData);
    }

}

electionController.prototype.getByNumber = async (req, res) => {

    try {

        let number = req.params.number;

        if (number) {
            let data = await _repo.getByNumber(number);
            res.status(200).send(data);
        } else {
            res.status(400).send({ message: 'O parametro number precisa ser informado.' })
        }


    } catch (error) {
        console.log('getByNumber com error: ' + error);
        res.status(500).send({
            message: 'Erro no processamento',
            error: error
        })
    }

}


module.exports = electionController;