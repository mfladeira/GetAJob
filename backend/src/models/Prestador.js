const { Sequelize, Model } = require('sequelize')

class Prestador extends Model {
    static init(sequelize) {
        super.init({
            nota_pessoal: Sequelize.DECIMAL
        }, { sequelize, tableName: 'prestador_servico' })
    }

    static associate(models) {
        this.hasMany(models.Servico, { foreignKey: 'prestador_id', as: 'prestadorId' })

        this.belongsToMany(models.Especialidade, { foreignKey: 'prestador_id', through: 'especialidade_prestador', as: 'especialidadePrestadorId' })
    }
}

module.exports = Prestador