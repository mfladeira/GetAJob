const EspecialidadePrestador = require('../models/EspecialidadePrestador')
const Prestador = require('../models/Prestador')
const Usuario = require('../models/Usuario')

class EspecialidadePrestadorController {
    async index(req, res) {
        try {
            const { especialidade_id } = req.body;
            const prestador = await EspecialidadePrestador.findAll({
                where: { especialidade_id },
                include: Prestador,
            });
            const usuario = await Usuario.findOne({
                where: {
                    id: prestador[0].Prestador.usuario_id
                }
            })
            return res.json({
                id: prestador[0].Prestador.id,
                nome: usuario.nome,
                email: usuario.email,
                nota_pessoal: prestador[0].Prestador.nota_pessoal
            });
        } catch (error) {
            return res.json(error)
        }
    }

    async store(req, res) {
        const { prestador_id, especialidade_id } = req.body
        const especialidadePrestador = await EspecialidadePrestador.create({
            prestador_id,
            especialidade_id
        })
        return res.json(especialidadePrestador)
    }

    async show(req, res) {
        const especialidadesPrestadores = await EspecialidadePrestador.findAll();
        return res.json(especialidadesPrestadores);
    }
}

module.exports = new EspecialidadePrestadorController()
