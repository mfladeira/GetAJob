const { Sequelize, Model } = require('sequelize')

class EspecialidadePrestador extends Model {
    static init(sequelize) {
        super.init({
            prestador_id: Sequelize.INTEGER,
            especialidade_id: Sequelize.INTEGER
        }, { sequelize, tableName: 'especialidade_prestador' })
    }

    static associate(models) {
        this.belongsTo(models.Especialidade, { foreignKey: 'especialidade_id' })
        this.belongsTo(models.Prestador, { foreignKey: 'prestador_id' })
    }
}

module.exports = EspecialidadePrestador