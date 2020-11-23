const EspecialidadePrestador = require('../models/EspecialidadePrestador')
const Prestador = require('../models/Prestador')
const Usuario = require('../models/Usuario')
const Especialidade = require('../models/Especialidade')

class EspecialidadePrestadorController {
    async index(req, res) {
        try {
            const { especialidade_id, tipo_de_servico_id } = req.body;
            const prestador = await EspecialidadePrestador.findAll({
                where: {
                    especialidade_id,
                    tipo_de_servico_id
                },
                attributes: ['id'],
                include: [
                    {
                        model: Prestador, include: [{ model: Usuario, attributes: ['nome', 'email', 'whatsapp'] }],
                        attributes: ['nota_pessoal', 'id']
                    },
                ],
            });
            return res.json(prestador);
        } catch (error) {
            return res.json(error)
        }
    }

    async store(req, res) {
        const { prestador_id, especialidade_id, tipo_de_servico_id } = req.body
        const especialidadePrestador = await EspecialidadePrestador.create({
            prestador_id,
            especialidade_id,
            tipo_de_servico_id
        })
        return res.json(especialidadePrestador)
    }

    async show(req, res) {
        const especialidadesPrestadores = await EspecialidadePrestador.findAll();
        return res.json(especialidadesPrestadores);
    }
}

module.exports = new EspecialidadePrestadorController()
