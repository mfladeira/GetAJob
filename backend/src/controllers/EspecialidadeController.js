const EspecialidadePrestador = require('../models/EspecialidadePrestador')
const Especialidade = require('../models/Especialidade')

class EspecialidadeController {
    async index(req, res) {
        try {
            const { tipo_de_servico_id } = req.body;
            const especialidades = await Especialidade.findAll({
                where: {
                    tipo_de_servico_id
                }
            })
            return res.json(especialidades);
        } catch (error) {
            return res.json(error)
        }
    }
}

module.exports = new EspecialidadeController()