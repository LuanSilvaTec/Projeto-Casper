import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

//import authConfig from '../config/auth';

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
	try {
		const authHeader=request.headers.authorization
		//console.log(authHeader)
		const [type, token] = authHeader.split(' ');
		if (!token) {
			return response.status(401).json({message: 'JWT Token is missing.' });
		}
		//console.log(token)
		const decodedToken = verify(token, '4618abe5d74670f36209f2bed928ae9a');
		//console.log(decodedToken);
		return next();


	}catch(err) {
		console.log(err)
		return response.status(401).json({message: 'Invalid JWT Token.' });
	}
	
}