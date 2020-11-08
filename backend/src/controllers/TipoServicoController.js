const TipoServico = require('../models/TipoServico')

class TipoServicoController {
    async index(req, res) {
        const tiposDeServicos = await TipoServico.findAll();
        return res.json(tiposDeServicos);
    }
}

module.exports = new TipoServicoController()