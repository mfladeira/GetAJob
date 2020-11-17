const Servico = require('../models/Servico')

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
                }
            })
            return res.json(servicos)
        } else {
            const servicos = await Servico.findAll({
                where: {
                    "prestador_id": data.prestador_id
                }
            })
            return res.json(servicos)
        }
    }

    async update(req, res){
        const data = req.body;
        const servico = await Servico.update({
            
        })
    }
}

module.exports = new ServicoController()