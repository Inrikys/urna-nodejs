'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const securityModel = new schema({
    name: { trim: true, index: true, required: true, type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

securityModel.pre('save', next => {
    let now = Date.now();
    if (!this.createdAt)
        this.createdAt = now;

    next();
});

module.exports = mongoose.model('Security', securityModel);