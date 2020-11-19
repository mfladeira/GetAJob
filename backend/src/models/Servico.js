const { Sequelize, Model } = require('sequelize')

class Servico extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
            status: Sequelize.STRING,
            prestador_id: Sequelize.INTEGER,
            usuario_id: Sequelize.INTEGER,
            especialidade_id: Sequelize.INTEGER
        }, { sequelize, tableName: 'servico' })
    }

    static associate(models) {
        this.belongsTo(models.Prestador, { foreignKey: 'prestador_id', as: 'prestadorId' });
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarioId' });
        this.belongsTo(models.Especialidade, { foreignKey: 'especialidade_id', as: 'especialidadeId' });
    }
}

module.exports = Servico