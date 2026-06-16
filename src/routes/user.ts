import express from 'express'
import type { Request, Response } from 'express'
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import middlewareToken from '../middleware/middlewareToken.js';

const router = express.Router();
interface CreateUserBody {
    email: string,
    name: string,
    password: string,

}

/* GET home page. */
router.get('/getuser', async(req: Request, res: Response) => {
    try {
        const getUser = await prisma.user.findMany();
        res.status(200).json(getUser);
    } catch (error) {
        console.error('Erreur lors de la récupération des hiraganas:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des hiraganas' });
    }
});

router.put('/updateuser', middlewareToken, async(req: Request, res: Response) => {
    if(!req.user) {
        return res.status(401).json({message: "Non autorized"})
    }
    try{
        const { email, name, password } = req.body;
        const userId = req.user.id
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        await prisma.user.update({
            where: {
                id : userId
            },
            data : {
                email,
                name,
                password: hash
            }
        })
        res.status(200).json({message: "database updated"})
    } catch{
        res.status(500).json({message: "Error server"})
    }
})

router.delete('/deleteuser', middlewareToken, async(req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Non autorized"})
        }
        await prisma.user.delete({
            where: {id: req.user.id}
        })
        res.status(204).send()
    } catch{
        res.status(500).json({message: "Error server"})
    }
})



export default router;