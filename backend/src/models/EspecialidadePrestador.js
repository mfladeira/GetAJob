const { Sequelize, Model } = require('sequelize')

class EspecialidadePrestador extends Model {
    static init(sequelize) {
        super.init({
            prestador_id: Sequelize.INTEGER,
            especialidade_id: Sequelize.INTEGER,
            tipo_de_servico_id: Sequelize.INTEGER
        }, { sequelize, tableName: 'especialidade_prestador' })
    }

    static associate(models) {
        this.belongsTo(models.Especialidade, { foreignKey: 'especialidade_id' })
        this.belongsTo(models.Prestador, { foreignKey: 'prestador_id' })
        this.belongsTo(models.TipoServico, { foreignKey:'tipo_de_servico_id'})
    }
}

module.exports = EspecialidadePrestador