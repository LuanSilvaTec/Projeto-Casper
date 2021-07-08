import express, { request, response } from 'express';
import SessionController from '../controllers/SessionController'

const sessionController = new SessionController();
const routes = express.Router()
routes.post('/',sessionController.singIn)

export default routes;