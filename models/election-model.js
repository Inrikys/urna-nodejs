'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const electionModel = new schema({
    name: { trim: true, index: true, required: true, type: String },
    party: { trim: true, type: String, required: true },
    number: { trim: true, type: Number},
    votes: { type: Number, default: 0 },
    comment: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

electionModel.pre('save', next =>{
    let now = Date.now();
    if(!this.createdAt)
        this.createdAt = now;

    next();
});

module.exports = mongoose.model('Election', electionModel);