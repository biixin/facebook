import { Request, Response } from 'express';
import { User } from '../models/User'
import { Comment } from '../models/Comments';


export const AddComment = async (req: Request, res: Response) => {
    const {idUser, idPost, body} = req.body

    const comments = await Comment.create({idUser, idPost, body})

    return res.json({status: true})
};

export const DeleteComment = async (req: Request, res: Response) => {
    const {idUser, idComment} = req.body

    if(!idUser ) {
        return res.json({status: false})
    }

    const hasUser = await User.findByPk(idUser)
    if(!hasUser) {
        return res.json({status: false, error: 'Usuário não encontrado'})
    }

    const hasComment = await Comment.findByPk(idComment)
    if(!hasComment) {
        return res.json({status: false, error: 'Comentário não identificado'})
    }
    if(hasComment.idUser != idUser) {
        return res.json({status: false, error: 'Você não tem permissão para excluir este comentário !'})
    }

    const comments = await Comment.destroy({where: {id: idComment }})

    return res.json({status: true})
};

