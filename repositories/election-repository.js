'use strict'
require("../models/election-model");
const mongoose = require('mongoose');
const base = require('../bin/base/repository-base');

class ElectionRepository {

    constructor() {
        this._model = mongoose.model('Election');
        this._base = new base('Election');
    }

    // general functions

    async create(data){
        return await this._base.create(data);
    }

    async update(id, data){
        return await this._base.update(id, data);
    }

    async getAll(){
        return await this._base.getAll()
    }

    async getById(id){
        return await this._base.getById(id);
    }

    async getByNumber(number){
        return await this._model.findOne({ number: number})
    }

    async delete(id){
        return await this._base.delete(id);
    }


    //expecifics functions
    async vote(id){
        let electionObj = await this._model.findById(id);
        electionObj.votes++;
        await this._model.findByIdAndUpdate(id,{ $set: electionObj})
        let result = await this._model.findById(id);
        return result;
    }

}

module.exports = ElectionRepository;