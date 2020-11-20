const express = require('express')

const UsuarioController = require('./controllers/UsuarioController')
const PrestadorController = require('./controllers/PrestadorController')
const ServicoController = require('./controllers/ServicoController')
const EspecialidadeController = require('./controllers/EspecialidadeController')
const TipoServicoController = require('./controllers/TipoServicoController')
const EspecialidadePrestadorController = require('./controllers/EspecialidadePrestadorController')
const DisponibilidadeController = require('./controllers/DisponibilidadeController')

const routes = express.Router()

routes.post('/criar-usuario', UsuarioController.store)
routes.post('/login', UsuarioController.login)
routes.get('/listar-usuarios', UsuarioController.index)

routes.get('/listar-tipos-de-servico', TipoServicoController.index)
routes.post('/listar-especialidade', EspecialidadeController.index)

routes.get('/listar-prestadores', PrestadorController.index)
routes.post('/listar-prestador', PrestadorController.show)

routes.post('/listar-prestador-especialidade', EspecialidadePrestadorController.index)

routes.post('/criar-especialidade-prestador', EspecialidadePrestadorController.store)
routes.get('/listar-usuario-prestador/:usuario_id', PrestadorController.show)
routes.get('/listar-servicos', ServicoController.index)

routes.post('/criar-disponibilidade', DisponibilidadeController.store)
routes.post('/listar-disponibilidade', DisponibilidadeController.index)

routes.post('/criar-servico', ServicoController.store)
routes.post('/listar-servicos', ServicoController.index)
routes.post('/update-servico', ServicoController.update)
routes.delete('/delete-servico', ServicoController.delete)

routes.put('/put-prestador', PrestadorController.update)

module.exports = routes