import { Request, Response } from 'express';
import { LikeComment } from '../models/LikesComment';
import { Comment } from '../models/Comments';
import { User } from '../models/User';


export const GetAllComments = async (req: Request, res: Response) => {
    const users = await User.findAll()
    return res.json({users})
};
