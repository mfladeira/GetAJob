const { Sequelize, Model } = require('sequelize')

class Prestador extends Model {
    static init(sequelize) {
        super.init({
            nota_pessoal: Sequelize.DECIMAL,
            usuario_id: Sequelize.INTEGER
        }, { sequelize, tableName: 'prestador_servico' })
    }

    static associate(models) {
        this.hasMany(models.Servico, { foreignKey: 'prestador_id', as: 'prestadorId' })

        this.belongsToMany(models.Especialidade, { foreignKey: 'prestador_id', through: 'especialidade_prestador', as: 'especialidadePrestadorId' })

        this.belongsTo(models.Usuario)
    }
}

module.exports = Prestador