const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://urnaadmin:admin@projetos-a74cy.mongodb.net/test?retryWrites=true&w=majority'
    }
}


module.exports = variables;