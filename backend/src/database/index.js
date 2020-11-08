const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')

const Usuario = require('../models/Usuario')
const Prestador = require('../models/Prestador')
const Servico = require('../models/Servico')
const Especialidade = require('../models/Especialidade')
const EspecialidadePrestador = require('../models/EspecialidadePrestador')
const TipoServico = require('../models/TipoServico')

const models = [Usuario, Prestador, Servico, TipoServico, Especialidade, EspecialidadePrestador]

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => {
            model.init(this.connection)
        })
        models.map((model) => {
            if (model.associate) model.associate(this.connection.models);
            return model;
        })

    }


}

module.exports = new Database();