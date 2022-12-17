
import { FriendInstance } from '../models/Friends';
import { UserInstance } from '../models/User';

export type FriendPost = {
    toId: {
        Posts: [{
            id: number,
            idUser: number,
            body: string,
            date: Date
        }]
    },
    fromId: {
        Posts: [{
            id: number,
            idUser: number,
            body: string,
            date: Date
        }]
    }
}

export type Posts = {
    id: number,
    idUser: number,
    body: string,
    date: Date,
}