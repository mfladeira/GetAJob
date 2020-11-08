const Prestador = require('../models/Prestador')
const Usuario = require('../models/Usuario')
const Servico = require('../models/Servico')

class ServicoController {
    async store(req, res) {
        const { usuario_id, prestador_id } = req.params
        const { date } = req.body
        try {
            const servico = await Servico.create({
                usuario_id: usuario_id,
                prestador_id: prestador_id,
                date: date
            })
            return res.json(servico)
        } catch (error) {
            return res.json(error)
        }
    }

    async index(req, res) {
        const servicos = await Servico.findAll({
            attributes: ['date', 'prestador_id', 'usuario_id'],
            include: [
                { model: Usuario, as: 'usuarioId' },
                { model: Prestador, as: 'prestadorId' },
            ]
        })
        return res.json(servicos)
    }
}

module.exports = new ServicoController()