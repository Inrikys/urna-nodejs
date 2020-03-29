'use strict'

const express = require ('express');
const router = express.Router();
const controller = require('../controllers/election-controller')
const auth = require('../middlewares/authentication');


let _ctrl = new controller();

router.get('/', _ctrl.get);

router.get('/:id', _ctrl.getById);

router.post('/', auth, _ctrl.post);

router.put('/:id', auth, _ctrl.put);

router.delete('/:id', auth, _ctrl.delete);


module.exports = router;