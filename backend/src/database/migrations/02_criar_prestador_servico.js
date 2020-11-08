'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('prestador_servico', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            usuario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: { model: 'usuario', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            nota_pessoal: {
                type: Sequelize.DECIMAL,
                allowNull: true,
                defaultValue: 5.0
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('prestador_servico');
    }
};