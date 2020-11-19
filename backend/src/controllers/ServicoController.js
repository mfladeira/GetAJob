const Servico = require('../models/Servico')
const Usuario = require('../models/Usuario')
const Especialidade = require('../models/Especialidade')
class ServicoController {
    async store(req, res) {
        const data = req.body
        try {
            const servico = await Servico.create(data)
            return res.json(servico)
        } catch (error) {
            return res.json(error)
        }
    }

    async index(req, res) {
        const data = req.body
        if (data.classificacao === "Usuario") {
            const servicos = await Servico.findAll({
                where: {
                    "usuario_id": data.usuario_id
                },
                include: [{ model: Usuario, as: 'usuarioId', attributes: ['nome'] }, { model: Especialidade, as: 'especialidadeId', attributes: ['nome'] }]
            })
            return res.json(servicos)
        } else {
            const servicos = await Servico.findAll({
                where: {
                    "prestador_id": data.prestador_id
                },
                include: [{ model: Usuario, as: 'usuarioId', attributes: ['nome'] }, { model: Especialidade, as: 'especialidadeId', attributes: ['nome'] }]

            })
            return res.json(servicos)
        }
    }

    async update(req, res) {
        const { status, id } = req.body;
        const servico = await Servico.update(
            { status },
            { where: { id } })
        return res.json(servico);
    }
}

module.exports = new ServicoController()