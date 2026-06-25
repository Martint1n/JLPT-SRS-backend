import express from 'express'
import type { Request, Response } from 'express'
import prisma from '../prisma.js';
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middlewareToken from '../middleware/middlewareToken.js';


const router = express.Router();
const secret_key_JWT = process.env.JWT_SECRET_KEY !;

interface CreateUserBody {
    email: string,
    name: string,
    password: string,
}

router.post('/signup', async(req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body as CreateUserBody;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

    const user = await prisma.user.create({
        data:{
            email,
            name,
            password: hash
        }
    })
    res.status(201).json({ message: 'User created' })
    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2002") {
                res.status(409).json({message:"email already exist"})
                console.error(error)
            }
            else {
                res.status(500).json({message:"Issue server"})
                console.error(error)
            }
        }
        else {
            res.status(500).json({message:"Issue server"})
            console.error(error)
        }
    }
})




router.post("/signin", async(req: Request, res: Response) => {

    try {

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.status(401).json({message: 'password incorrect'})
    }
    const comparedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparedPassword) {
        return res.status(401).json({message: 'password incorrect'})
    }

    const token = jwt.sign({id: user.id}, secret_key_JWT, {expiresIn: '24h'})
    res.status(200).json({token, message: "connected"})

    } catch (error){
        res.status(500).json({message:"Issue server"})
    }
})

router.get('/me', middlewareToken, async(req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({message: 'Error token'})
    }
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true, email: true, name: true, progress: true, dailyNewCards: true,
            }
            // can use omit password instead of select
        })
        res.status(200).json({user, message: 'User authorized'});
    } catch{
        res.status(500).json({message: 'Error server'});

    }
})

export default router