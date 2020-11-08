const Usuario = require('../models/Usuario')
const Prestador = require('../models/Prestador')
const Especialidade = require('../models/Especialidade')

class PrestadorController {
    async show(req, res) {
        const { usuario_id } = req.params;
        const prestador = await Prestador.findOne({
            where: { id: usuario_id },
            include: [{ model: Usuario, as: 'prestadorServico' }, { model: Especialidade, as: 'especialidadePrestadorId' }]
        });
        return res.json(prestador);
    }
    async index(req, res) {
        const prestadores = await Prestador.findAll();
        return res.json(prestadores);
    }
}

module.exports = new PrestadorController()