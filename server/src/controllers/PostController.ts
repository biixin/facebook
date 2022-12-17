import { Request, Response } from 'express';
import { User } from '../models/User'
import { Post } from '../models/Posts';
import { Friend } from '../models/Friends';
import { Op } from 'sequelize';
import { Posts } from '../types/FriendsPosts';
import { verifyPostExists } from './../helpers/foundPost';
import { sortPostByDate } from '../helpers/sortPosts';
import { Image } from '../models/Images';
import { Comment } from '../models/Comments';
import { LikePost } from '../models/LikesPost';
import { LikeComment } from '../models/LikesComment';



export const AddPost = async (req: Request, res: Response) => {
    const { idUser, body } = req.body

    if(!idUser) {
        return res.status(404).json({status: false})
    }
    const hasUser = await User.findByPk(idUser)
    if(!hasUser) {
        return res.status(404).json({status: false})
    }

    const newPost = await Post.create({
        idUser, body, date: new Date()
    })

    return res.status(200).json({status: true, id: newPost.id, result: newPost, })

};

export const GetMyPosts = async (req: Request, res: Response) => {
    const {idUser} = req.body

    if(!idUser || idUser == null || idUser == undefined) {
        return res.json({status: false})
    }

    const idNumber = idUser.replace(/\D/g, "")
    if(idNumber == '') {
        return res.status(404).json({status: false})
    }

    const posts = await Post.findAll({
        where: {
            idUser
        },
        include: [{
                model: User,
                attributes: ['id', 'name', 'email', 'avatar']
            }, {
                model: LikePost
            }, {
                model: Image
            },  {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'email', 'avatar']
                }, {
                    model: LikeComment
                }]
            }
        ]
    })

    return res.status(200).json(posts)

};

export const GetAllPosts = async (req: Request, res: Response) => {
    const {idUser} = req.body

    if(!idUser || idUser == null || idUser == undefined) {
        return res.json({status: false})
    }

    // Get Friends Posts with Friend privacity
    const friends = await Friend.findAll({include: 
        [
            {
                model: User,
                include: [{
                    model: Post,
                    where: {privacity: 'friends'},
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email', 'avatar']
                        },
                        {
                            model: Comment,
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'name', 'email', 'avatar']
                                },
                                {
                                    model: LikeComment,
                                },

                            ],
                        }
                    ]
                }],
                as: 'toId'
            },
            {
                model: User,
                include: [{
                    model: Post,
                    //where: {privacity: 'friends'},
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email', 'avatar']
                        },
                        {
                            model: Comment,
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'name', 'email', 'avatar']
                                },
                                {
                                    model: LikeComment,
                                },
                            ],
                        },
                        {
                            model: LikePost
                        }
                    ]
                }],
                as: 'fromId'
            }
        ],
        where: {
            [Op.or]: [
                {to: idUser},
                {from: idUser}
            ],
            status: 'friend'
        }
    })
    // Get Public Posts
    const publics = await Post.findAll({
        where: {
            privacity: 'public'
        },
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email', 'avatar']
            },
            {
                model: Image,
                attributes: ['url']
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'email', 'avatar']
                    },
                    {
                        model: LikeComment
                    },
                ],
            },
            {
                model: LikePost,
                
            }
        ]
    })

    const posts: Posts[] = [...publics]

    // Pushing all posts friends inside 'posts', verifying if already exists in the 'posts'
    for(let i in friends) {
        if(friends[i].toId != null) {
            for (let x = 0; x < friends[i].toId.Posts.length ; x++) {
                const found = verifyPostExists(posts, friends[i].toId.Posts[x].id)
                if(!found) {
                    if(friends[i].toId.Posts[x]) {
                        posts.push(friends[i].toId.Posts[x])
                    }
                }
            }
        }
        if(friends[i].fromId != null) {
            for (let x = 0; x < friends[i].fromId.Posts.length ; x++) {
                const found = verifyPostExists(posts, friends[i].fromId.Posts[x].id)
                if(!found) {
                    if(friends[i].fromId.Posts[x]) {
                        posts.push(friends[i].fromId.Posts[x])
                    }
                }
            }
        } 
    }

    const sortedPosts = sortPostByDate(posts)
    return res.status(200).json( sortedPosts )
};





export const DeletePost = async (req: Request, res: Response) => {
    const {idUser, idPost} = req.body

    if(!idUser || !idPost) {
        return res.status(404).json({status: false})
    }

    const user = await User.findByPk(idUser)
    if(!user) {
        return res.status(404).json({status: false})
    }

    const post = await Post.findByPk(idPost)
    if(!post) {
        return res.status(404).json({status: false})
    }

    if(user?.id != post?.idUser) {
        return res.status(404).json({status: false})
    }

    const deletePost = await Post.destroy({where: {
        id: idPost
    }})

    return res.status(200).json({status: true})

};

export const EditPost = async (req: Request, res: Response) => {
    const {idUser, idPost, body} = req.body

    if(!idUser || !idPost || !body ) {
        return res.status(404).json({status: false})
    }

    const user = await User.findByPk(idUser)
    if(!user) {
        return res.status(404).json({status: false})
    }

    const post = await Post.findByPk(idPost)
    if(!post) {
        return res.status(404).json({status: false})
    }

    if(user?.id != post?.idUser) {
        return res.status(404).json({status: false})
    }

    post.body = body
    await post.save()

    return res.status(200).json({status: true})

};