import express, { request, response } from 'express';
import NoticiaController from './controllers/NoticiaController'

const routes = express.Router()

const noticiaController = new NoticiaController();

routes.get('/noticia', noticiaController.index)
routes.post('/noticia', noticiaController.create)
routes.put('/noticia/:id', noticiaController.update)
routes.delete('/noticia/:id', noticiaController.delete)

export default routes;