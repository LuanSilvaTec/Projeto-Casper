import express, { request, response } from 'express';
import UserController from '../controllers/UserController'
const userController = new UserController();

const routes = express.Router()

routes.get('/',userController.index)
routes.post('/',userController.create)
export default routes;