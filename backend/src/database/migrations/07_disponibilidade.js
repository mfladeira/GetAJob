'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('disponibilidade', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            prestador_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: { model: 'prestador_servico', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            segunda: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            terca: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            quarta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            quinta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            sexta: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            sabado: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            domingo: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            horario_inicio: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            horario_termino: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('disponibilidade');
    }
};