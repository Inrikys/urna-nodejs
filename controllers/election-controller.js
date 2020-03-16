'use strict'
require('../models/election-model');

const mongoose = require('mongoose');
const election = mongoose.model('Election');

function electionController() {

}

electionController.prototype.get = async (req, res) => {
    let response = await election.find();
    res.status(200).send(response);
}


electionController.prototype.getById = async (req, res) => {
    let response = await election.findById(req.params.id);

    res.status(200).send(response);
}


electionController.prototype.post = async (req, res) => {
    let model = election(req.body);
    let response = await model.save();

    res.status(201).send(response);
}


electionController.prototype.put = async (req, res) => {
    let response = await election.findByIdAndUpdate(req.params.id, { $set: req.body });

    res.status(202).send(response);
}


electionController.prototype.delete = async (req, res) => {
    let response = await election.findByIdAndDelete(req.params.id);

    res.status(204).send('Eleitor deletado');
}


module.exports = electionController;