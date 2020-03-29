'use strict'
const mongoose = require('mongoose');

class RepositoryBase {

    constructor(model) {
        this._model = mongoose.model(model);
    }

    async create(data){
        let objModel = this._model(data);
        let result = await objModel.save();
        return result;
    }

    async update(id, data){
        await this._model.findByIdAndUpdate(id,{ $set: data})
        let result = await this._model.findById(id);
        return result;
    }

    async getAll(){
        return await this._model.find();
    }

    async getById(id){
        return await this._model.findById(id)
    }

    async delete(id){
        return await this._model.findByIdAndRemove(id);
    }

}

module.exports = RepositoryBase;