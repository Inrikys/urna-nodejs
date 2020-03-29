require("../models/security-model");
const md5 = require("md5");
const base = require('../bin/base/repository-base');

class SecurityRepository {

    constructor() {
        this._base = new base('Security');
        this._projection = 'name email alreadyVoted _id'
    }

    async emailAlreadyExist(email){
        return await this._base._model.findOne({email: email}, this._projection);
    }

    async authenticate(email, password) {
        let _hashPassword = md5(password);
        return await this._base._model.findOne({ email: email, password: _hashPassword },
            this._projection)
    }

    async create(data) {
        let createdUser = await this._base.create(data);
        return this._base._model.findById(createdUser.id, this._projection);
    }

    async update(id, data) {
        let updatedUser = await this._base.update(id, data);
        return this._base._model.findById(updatedUser.id, this._projection);
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id) {
        return await this._base.delete(id);
    }

}

module.exports = SecurityRepository;