import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken';

const secret_key_JWT = process.env.JWT_SECRET_KEY !;

const middlewareToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        if (!req.headers.authorization?.startsWith("Bearer ")) {
            return res.status(401).json({message: "Incorrect token"})
        } 
        const token = req.headers.authorization.split(" ")[1] // lieu ou est le token depuis le frontend
        if (!token) {
            return res.status(401).json({message: "Missing token"})
        }else {
            const decoded = jwt.verify(token, secret_key_JWT)//check if token exist with jwt.verify)()
            req.user = decoded as JwtPayload
            next()
        }
    }catch {
        res.status(401).json({message: "Token unknown"})
    }
}

export default middlewareToken;