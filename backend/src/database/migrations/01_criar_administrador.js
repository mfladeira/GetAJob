'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('administrador', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            usuario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: { model: 'usuario', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            senha: {
                type: Sequelize.STRING,
                allowNull: false
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('administrador');
    }
};