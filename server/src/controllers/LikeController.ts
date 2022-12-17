import { Request, Response } from 'express';
import { LikePost } from '../models/LikesPost';
import { LikeComment } from '../models/LikesComment';
import { Comment } from '../models/Comments';


export const GetAllComments = async (req: Request, res: Response) => {
    const comments = await Comment.findAll({
        include: LikeComment
    })
    return res.json({comments})
};

export const AddPostLike = async (req: Request, res: Response) => {

    const {idUser, idPost} = req.body

    if(!idUser || !idPost) {
        return res.status(404).json({status: false})
    }

    const hasLike = await LikePost.findOne({where: {idUser, idPost}})

    if(hasLike) {
        const excludeLike = await LikePost.destroy({where: {idUser, idPost}})
        return res.status(200).json({status: 'dislike'})
    }

    
    const addLike = await LikePost.create({idUser, idPost})
    return res.status(200).json({status: 'like'})

};

export const AddCommentLike = async (req: Request, res: Response) => {

    const {idUser, idComment} = req.body

    if(!idUser || !idComment) {
        return res.status(404).json({status: false})
    }

    const hasLike = await LikeComment.findOne({where: {idUser, idComment}})

    if(hasLike) {
        const excludeLike = await LikeComment.destroy({where: {idUser, idComment}})
        return res.status(200).json({status: 'dislike'})
    }

    
    const addLike = await LikeComment.create({idUser, idComment})
    return res.status(200).json({status: 'like'})

};
