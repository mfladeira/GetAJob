const { Sequelize, Model } = require('sequelize')

class Disponibilidade extends Model {
    static init(sequelize) {
        super.init({
            prestador_id: Sequelize.INTEGER,
            segunda: Sequelize.BOOLEAN,
            terca: Sequelize.BOOLEAN,
            quarta: Sequelize.BOOLEAN,
            quinta: Sequelize.BOOLEAN,
            sexta: Sequelize.BOOLEAN,
            sabado: Sequelize.BOOLEAN,
            domingo: Sequelize.BOOLEAN,
            horario_inicio: Sequelize.TIME,
            horario_termino: Sequelize.TIME,
        }, { sequelize, tableName: 'disponibilidade' })
    }

    static associations(models) {
        this.belongsTo(models.Prestador, { foreignKey: 'especialidade_id' })
    }
}

module.exports = Disponibilidade