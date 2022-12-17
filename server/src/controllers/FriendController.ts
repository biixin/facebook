import { Request, Response } from 'express';
import { User, UserInstance } from '../models/User'
import { Post } from '../models/Posts';
import { Friend } from '../models/Friends';
import { Op } from 'sequelize';
import { arch } from 'os';

type userFriends = {
    id: number,
    name: string,
    email: string
    avatar: string

}

export const GetAllFriends = async (req: Request, res: Response) => {
    const {id} = req.params

    if(!id) {
         return res.status(404).json({status: false})
    }

    const friends = await Friend.findAll({
        where: {
            to: id,
            status: 'friend'
        },
        include: 
        [
            {
                model: User,
                as: 'fromId',
                attributes: ['id', 'name','email','avatar']
            }
        ]
    })
    const usersFriends: any = []
    for(let i in friends) {
        usersFriends.push(friends[i].fromId)
    }
    return res.status(200).json(usersFriends)
};

export const GetAll = async (req: Request, res: Response) => {

    const friends = await Friend.findAll({include: 
        [
            {
                model: User,
                include: [{
                    model: Post,
                    required: true
                }],
                as: 'toId'
            },
            {
                model: User,
                include: [{
                    model: Post,
                    required: true
                }],
                as: 'fromId'
            }
        ]
    })

    return res.status(200).json({friends})
};


export const Add = async (req: Request, res: Response) => {
    const { from, to } = req.body

    if( !to || !from) {
        return res.status(404).json({status: false})
    }

    const hasFriend = await Friend.findAll({where: {
        to: to,
        from: from
    }})
    
    if(hasFriend.length > 0) {
        return res.status(404).json({status: false})
    }

    const newFriend1 = await Friend.create({from, to, sender: true})
    const newFriend2 = await Friend.create({from: to, to: from})

    return res.status(200).json({status: true, result: 'Pedido de amizade enviado com sucesso !'})

};



export const GetAllFriendRequests = async (req: Request, res: Response) => {
    const {id} = req.params

    const requests = await Friend.findAll({
        where: {
            to: id,
            status: 'pendent',
            sender: true
        },
        include: 
        [
            {
                model: User,
                as: 'fromId',
                attributes: ['id', 'name','email','avatar']
            }
        ]
    })
    const users: UserInstance[] = []
    for(let i in requests) {
        users.push(requests[i].fromId as any)
    }

    return res.status(200).json(users)
};

export const GetSuggestList = async (req: Request, res: Response) => {
    const {id} = req.params

    if(!id) {
        return res.json({status: false})
    }

    //Users Not Friends or Pendent
    const friends = await Friend.findAll({
        where: {
            to: id,
            status: {
                [Op.or]: ['friend', 'pendent']
            }
        },
        include: {
            model: User,
            as: 'fromId',
            attributes: ['id', 'name','email','avatar']
        }
    })
    const usersFriends: userFriends[] = [] 
    for(let i in friends) {
        usersFriends.push(friends[i].fromId as any)
    }

    //AllUsers
    const allUsers = await User.findAll({
        where: {
            [Op.not]: {
                id: id
            }
        },
        attributes: ['id', 'name','email','avatar']
    })

    const result = allUsers.filter(i => !usersFriends.find(rm => (rm.id === i.id )))

    return res.status(200).json(result)
};

export const AcceptFriendRequest = async (req: Request, res: Response) => {
    const { to, from } = req.body

    if( !to || !from) {
        return res.status(404).json({status: false})
    }

    const hasRequest = await Friend.findAll({
        where: {
            to,
            from,
            sender: true
        }
    })
    
    if(hasRequest.length == 0) {
        return res.status(404).json({status: false})
    }

    const acceptRequest = await Friend.update({status: 'friend'},{
        where: {
            [Op.or]: [
                {to, from},
                {to: from, from: to}
            ]
        }
    })


    return res.status(200).json({acceptRequest})

};

export const RejectFriendRequest = async (req: Request, res: Response) => {
    const { to, from } = req.body

    if( !to || !from) {
        return res.status(404).json({status: false})
    }

    const hasRequest = await Friend.findAll({
        where: {
            to,
            from,
            sender: true
        }
    })
    
    if(hasRequest.length == 0) {
        return res.status(404).json({status: false})
    }

    const acceptRequest = await Friend.destroy({
        where: {
            [Op.or]: [
                {to, from},
                {to: from, from: to}
            ]
        }
    })
    return res.status(200).json({acceptRequest})

};


