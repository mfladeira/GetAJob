module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tipo_servico', [
            { nome: "Serviços Domésticos", created_at: new Date, updated_at: new Date },
            { nome: "Reformas", created_at: new Date, updated_at: new Date },
            { nome: "Design E Tecnologia", created_at: new Date, updated_at: new Date},
            { nome: "Consultoria", created_at: new Date, updated_at: new Date}
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tipo_servico')
    }
}