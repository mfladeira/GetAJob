const {Sequelize, Model} = require('sequelize');

class TipoServico extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING
        }, {sequelize, tableName:'tipo_servico'})
    }
}

module.exports = TipoServico