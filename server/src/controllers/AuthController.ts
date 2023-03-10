import { Request, Response } from 'express';
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { validationResult, matchedData } from 'express-validator'
const bcrypt = require('bcrypt');
dotenv.config()

export const signin = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    let { name, email, password, state } = req.body

    if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.mapped() });
    }
    const data = matchedData(req);

    const user = await User.findOne({ where: { email: data.email } })
    if (!user) {
        return res.json({ error: 'E-mail e/ou senha errados!' });
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        return res.json({ error: 'Email e/ou senha errados!' });
    }
    const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '9999h' }
    )
    
    user.token = token;
    user.lastLog = new Date()

    await user.save()
    

    return res.json({ status: true, token, user })



};

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.mapped() });
    }
    const data = matchedData(req);
    const hasUser = await User.findOne({
        where: {
            email: data.email
        }
    })
    if (hasUser) {
        return res.json({ error: { email: { msg: 'E-mail já existente' } } })
    }

    const passHash = await bcrypt.hash(data.password, 10)

    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: passHash
    })

    const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: 300 }
    )

    res.status(200).json({ status: true, result: 'Conta criada com sucesso!', token,
        user: {id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar, background: newUser.background}
    })
}


export const AccountREQUEST = async (req: Request, res: Response) => {
    const id = req.id // id pego no decoded token do Auth.Private
    const token = req.token
    if (!token) {
        return res.json({ error: 'Token não encontrado' })
    }
    let user = await User.findOne({
        where: {
            id
        }
    });
    if (!user) {
        return res.json({ error: 'Usuário não encontrado' })
    }

    user.lastLog = new Date()
    await user.save()
    
    return res.json({ user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, background: user.background } })

}

