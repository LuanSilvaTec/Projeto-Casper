import express, { request, response } from 'express';
import Hook from '../hooks/dialog'

const hook = new Hook();
const routes = express.Router()
routes.post('/',hook.dialog)

export default routes;