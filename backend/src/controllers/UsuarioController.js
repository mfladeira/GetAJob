const Usuario = require('../models/Usuario')
const Prestador = require('../models/Prestador')
const EspecialidadePrestador = require('../models/EspecialidadePrestador')

class UsuarioController {

    async login(req, res) {
        let { email, senha, } = req.body
        const usuario = await Usuario.findOne({
            where: {
                email,
                senha,
            },
        })
        if (!usuario) {
            return res.json({ error: 'Email ou senha incorreto' })
        }
        return res.json(usuario)
    }

    async store(req, res) {
        try {
            const data = req.body
            const whatsapp = `55${data.whatsapp}`
            const usuario = await Usuario.create({ ...data, whatsapp: whatsapp })
            if (usuario.classificacao === "Prestador") {
                const { id } = await Prestador.create({
                    usuario_id: usuario.id,
                })
                return res.json({ id })
            }
            return res.json({ message: 'Cadastro realizado com sucesso!' })
        } catch (error) {
            return res.json({ error })
        }
    }

    async index(req, res) {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nome', 'email', 'senha', 'classificacao', 'whatsapp'],
            // include: [{ model: Prestador, as: 'prestadorServico', where: { tipo_de_servico: "caminhoneiro" } }]
            //include: [{ model: Prestador, as: 'prestadorServico' }]
        })
        return res.json(usuarios)
    }
}

module.exports = new UsuarioController()