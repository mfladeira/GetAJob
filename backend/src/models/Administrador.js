const { Sequelize, Model } = require('sequelize')

class Administrador extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
        }, { sequelize })
    }
}

module.exports = Administrador