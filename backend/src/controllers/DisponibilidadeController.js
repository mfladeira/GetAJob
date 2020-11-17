const Disponibilidade = require('../models/Disponibilidade')

class DisponibilidadeController {
    async store(req, res) {
        const data = req.body;
        const response = await Disponibilidade.create(data);
        return res.json(response);
    }

    async index(req, res) {
        const { prestador_id } = req.body;
        const response = await Disponibilidade.findOne(
            { where: prestador_id }
        )
        return res.json(response);
    }
}

module.exports = new DisponibilidadeController();