import { Request, Response } from 'express';
import knex from '../database/connection'
import { hash } from 'bcryptjs';


class UserController {
    async index(request: Request, response: Response) {
        const users = await knex('users').select('*');
        const serializedUsers = users.map(user => {
            return {
                id: user.id,
                login: user.login,
                password: user.password
            }
        })
        return response.json(serializedUsers)
    }
    async create(request: Request, response: Response) {
        const {
            login,
            password
        } = request.body;

        const passwordHashed = await hash(password, 8);
        

        const user = {
            login,
            password:passwordHashed
        }

        console.log("AQUI")

        const trx = await knex.transaction();
        const insertedIds = await trx('users').insert(user)
        const user_id = insertedIds[0];


        await trx.commit();
        return response.json({
            id: user_id,
            ...user,
        })
    }

}


export default UserController;