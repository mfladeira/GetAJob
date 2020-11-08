const { Sequelize, Model } = require('sequelize')

class Servico extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
        }, { sequelize, tableName: 'servico' })
    }

    static associate(models) {
        //this.belongsTo(models.Prestador, { foreignKey: 'prestador_id', as: 'prestadorId' });
        //this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarioId' });
    }
}

module.exports = Servico