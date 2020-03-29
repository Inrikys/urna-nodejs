const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://urnaadmin:admin@projetos-a74cy.mongodb.net/test?retryWrites=true&w=majority'
    },
    Security: {
        secretKey: '83a6c8fb8e054de73cb4f76c3c6f9701'
    }
}


module.exports = variables;