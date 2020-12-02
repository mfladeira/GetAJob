const Usuario = require('../models/Usuario')
const Prestador = require('../models/Prestador')
const Especialidade = require('../models/Especialidade')

class PrestadorController {
    async show(req, res) {
        const { id } = req.body;
        const prestador = await Prestador.findOne({
            where: { id },
        });
        return res.json(prestador);
    }

    async index(req, res) {
        const prestadores = await Prestador.findAll();
        return res.json(prestadores);
    }

    async update(req, res) {
        const { id, notaPessoal } = req.body
        const response = await Prestador.update(
            { nota_pessoal: notaPessoal },
            { where: { id } }
        )
        return res.json(response)
    }
}

module.exports = new PrestadorController()