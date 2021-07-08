import express, { request, response } from 'express';
import NoticiaController from '../controllers/NoticiaController'
import isAuthenticated from '../middlewares/isAuthenticated'
const routes = express.Router()

const noticiaController = new NoticiaController();


routes.use(isAuthenticated)

routes.get('/', noticiaController.index)
routes.post('/', noticiaController.create)
routes.put('/:id', noticiaController.update)
routes.delete('/:id', noticiaController.delete)

export default routes;