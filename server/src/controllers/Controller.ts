import { Request, Response } from 'express';
import dotenv from 'dotenv'
import { User } from '../models/User';
import { matchedData, validationResult } from 'express-validator';
import { Post } from '../models/Posts';

dotenv.config()

export const ping = async (req: Request, res: Response) => {
    return res.json('pong')
};

export const getAllUsers = async (req: Request, res: Response) => {

    const users = await User.findAll({include: [
        {
            model: Post,
            required: true,
            include: [
                {
                    model: User,
                    required: true
                }
            ]
        }

    ]})

    if (users) {
        return res.status(201).json(users)
    }
    return res.status(404).json({ error: 'Ocorreu algum erro' })
};

export const getOneUser = async (req: Request, res: Response) => {
    const {id} = req.body

    if(!id) {
        return res.status(404).json({status: false})
    }
    const idNumber = id.replace(/\D/g, "")
    if(idNumber == '') {
        return res.status(404).json({status: false})
    }

    const users = await User.findOne({where: {id: idNumber}})

    if (users) {
        return res.status(201).json({users, status: true})
    }
    return res.json({ error: 'Usuário não encontrado', status: false })
};

export const editBackgroundUser = async (req: Request, res: Response) => {
    const {background, id} = req.body

    if(!id) {
        return res.status(404).json({status: false})
    }
    const user = User.update(
        {background},
        {where: {id}}
    )
    
    return res.json({status: true})
};

export const editProfileUser = async (req: Request, res: Response) => {
    const {profile, id} = req.body

    if(!id) {
        return res.status(404).json({status: false})
    }
    const user = User.update(
        {avatar: profile},
        {where: {id}}
    )
    return res.json({status: true})
};



