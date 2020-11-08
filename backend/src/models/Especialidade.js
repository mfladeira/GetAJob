const { Sequelize, Model } = require('sequelize')

class Especialidade extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            tipo_de_servico_id: Sequelize.INTEGER
        }, { sequelize, tableName: 'especialidade' })
    }

    static associations(models) {
        this.belongsToMany(models.Prestador, { foreignKey: 'especialidade_id', through: 'especialidade_prestador', as: 'especialidadeId' })

        this.belongsTo(models.TipoServico, { foreignKey:'tipo_de_servico_id', as: 'tipoServicoId'})
    }
}

module.exports = Especialidade