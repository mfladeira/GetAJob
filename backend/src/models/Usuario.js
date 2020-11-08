const { Sequelize, Model } = require('sequelize')

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
            whatsapp: Sequelize.STRING,
            classificacao: Sequelize.STRING,
            latitude: Sequelize.DECIMAL,
            longitude: Sequelize.DECIMAL,
            
        }, { sequelize, tableName: 'usuario' })
    }

    static associate(models) {
        this.hasOne(models.Prestador, { foreignKey: 'usuario_id', as: 'prestadorServico' });

        this.hasMany(models.Servico, { foreignKey: 'usuario_id', as: 'usuarioId' });
    }
}

module.exports = Usuario