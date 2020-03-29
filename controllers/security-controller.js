'use strict'

const repository = require('../repositories/security-repository');

const _repo = new repository();

function securityController() {

}

securityController.prototype.get = async (req, res) => {
    let response = await _repo.getAll()
    res.status(200).send(response);
}


securityController.prototype.getById = async (req, res) => {
    let response = await _repo.getById(req.params.id);

    res.status(200).send(response);
}


securityController.prototype.post = async (req, res) => {
    let response = await _repo.create(req.body);
    res.status(201).send(response);
}


securityController.prototype.put = async (req, res) => {
    let response = await _repo.update(req.params.id, req.body);

    res.status(202).send(response);
}


securityController.prototype.delete = async (req, res) => {
    let response = await _repo.delete(req.params.id);

    res.status(204).send(response);
}


module.exports = securityController;