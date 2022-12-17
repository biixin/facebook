import { Request, Response } from 'express';
import { Image } from '../models/Images';


export const AddPhoto = async (req: Request, res: Response) => {
    const {idPost, ref, url} = req.body

    if(!idPost || !ref || !url) {
        return res.status(404).json({status:false })
    }

    const image = await Image.create({
        idPost, ref, url
    })

    return res.status(200).json({image})

};

export const EditPhoto = async (req: Request, res: Response) => {
    const {idPost, ref, url} = req.body

    if(!idPost || !ref || !url) {
        return res.status(404).json({status:false })
    }

    const image = await Image.findOne({where: {idPost}})

    if(!image) {
        return res.status(404).json({status:false })
    }
    image.ref = ref
    image.url = url
    image.save()

    return res.status(200).json({image})

};
