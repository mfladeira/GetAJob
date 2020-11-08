'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('especialidade_prestador', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            prestador_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'prestador_servico', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            especialidade_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'especialidade', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        return queryInterface.dropTable('especialidade_prestador');
    }
};