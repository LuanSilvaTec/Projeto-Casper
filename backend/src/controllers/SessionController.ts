import { Request, Response } from 'express';
import knex from '../database/connection'
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class SessionController {
    async singIn(request: Request, response: Response) {
        const { login, password } = request.body; 
        const user = await knex('users').where('login', login).first();
        console.log(user)
        if (!user) {
            return response.status(400).json({ message: 'Credentials not found.' });
        }
        const comparePassword = await compare(password, user.password);
        if (!comparePassword) {
            return response.status(400).json({ message: 'Credentials not found.' });
        }
        const token = sign({
            userId: user.id,
            login: user.login
        },
        '4618abe5d74670f36209f2bed928ae9a',
        {
            expiresIn: "1h"
        });
        /*
        const token = sign({},"" + process.env.JWT_SECRET, {
            subject: String(user.id),
            expiresIn:"1d"
        });
        */
    
        return response.json({ user, token });
    }
    

}


export default SessionController;