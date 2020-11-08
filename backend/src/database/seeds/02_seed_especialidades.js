module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('especialidade', [
            { nome: "Diarista", tipo_de_servico_id: 1, created_at: new Date, updated_at: new Date },
            { nome: "Babá", tipo_de_servico_id: 1, created_at: new Date, updated_at: new Date },
            { nome: "Passadeira", tipo_de_servico_id: 1, created_at: new Date, updated_at: new Date },
            { nome: "Limpeza de Piscina", tipo_de_servico_id: 1, created_at: new Date, updated_at: new Date },

            { nome: "Construção", tipo_de_servico_id: 2, created_at: new Date, updated_at: new Date },
            { nome: "Instalação", tipo_de_servico_id: 2, created_at: new Date, updated_at: new Date },
            { nome: "Reformas e Reparos", tipo_de_servico_id: 2, created_at: new Date, updated_at: new Date },
            { nome: "Serviços Gerais", tipo_de_servico_id: 2, created_at: new Date, updated_at: new Date },

            { nome: "Tecnologia", tipo_de_servico_id: 3, created_at: new Date, updated_at: new Date },
            { nome: "Gráfica", tipo_de_servico_id: 3, created_at: new Date, updated_at: new Date },
            { nome: "Áudio", tipo_de_servico_id: 3, created_at: new Date, updated_at: new Date },
            { nome: "Visual", tipo_de_servico_id: 3, created_at: new Date, updated_at: new Date },

            { nome: "Mídia", tipo_de_servico_id: 4, created_at: new Date, updated_at: new Date },
            { nome: "Negócios", tipo_de_servico_id: 4, created_at: new Date, updated_at: new Date },
            { nome: "Jurídico", tipo_de_servico_id: 4, created_at: new Date, updated_at: new Date },
            { nome: "Pessoal", tipo_de_servico_id: 4, created_at: new Date, updated_at: new Date }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('especialidade')
    }
}