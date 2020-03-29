'use strict'

const repository = require('../repositories/election-repository');

function electionController() {

}

electionController.prototype.get = async (req, res) => {
    let response = await new repository().getAll()
    res.status(200).send(response);
}


electionController.prototype.getById = async (req, res) => {
    let response = await new repository().getById(req.params.id);

    res.status(200).send(response);
}


electionController.prototype.post = async (req, res) => {
    let response = await new repository().create(req.body);
    res.status(201).send(response);
}


electionController.prototype.put = async (req, res) => {
    let response = await new repository().update(req.params.id, req.body);

    res.status(202).send(response);
}


electionController.prototype.delete = async (req, res) => {
    let response = await new repository().delete(req.params.id);

    res.status(204).send(response);
}


module.exports = electionController;