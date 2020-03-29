exports.post = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;
        if (!validationContract.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição.",
                validation: validationContract.errors()
            }).end();
            return;
        }

        let result = await repository.create(data);
        res.status(201).send(result);

    } catch (error) {
        console.log('Post com error: ' + error);
        res.status(500), send({
            message: 'Erro no processamento',
            error: error
        })
    }
}

exports.put = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;
        let id = req.params.id;

        if (!validationContract.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição.",
                validation: validationContract.errors()
            }).end();
            return;
        }

        let result = await repository.update(id, data);
        res.status(202).send(result);

    } catch (error) {
        console.log('Put com error: ' + error);
        res.status(500), send({
            message: 'Erro no processamento',
            error: error
        })
    }
}

exports.get = async (repository, req, res) => {
    try {

        let data = await repository.getAll();
        res.status(200).send(data);

    } catch (error) {
        console.log('Get com error: ' + error);
        res.status(500), send({
            message: 'Erro no processamento',
            error: error
        })
    }
}

exports.getById = async (repository, req, res) => {
    try {

        let id = req.params.id;

        if (id) {
            let data = await repository.getById(id);
            res.status(200).send(data);
        } else {
            res.status(400).send({ message: 'O parametro ID precisa ser informado.' })
        }


    } catch (error) {
        console.log('getById com error: ' + error);
        res.status(500), send({
            message: 'Erro no processamento',
            error: error
        })
    }
}

exports.delete = async (repository, req, res) => {
    try {

        let id = req.params.id;

        if (id) {
            let data = await repository.delete(id);
            res.status(200).send({ message: "Registro excluído com sucesso." });
        } else {
            res.status(400).send({ message: 'O parametro ID precisa ser informado.' })
        }

    } catch (error) {
        console.log('Delete com error: ' + error);
        res.status(500), send({
            message: 'Erro no processamento',
            error: error
        })
    }
}