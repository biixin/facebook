export type Post = {
    id: number,
    idUser: number,
    body: string,
    privacity: string,
    date: Date,
    User: {
        id: number,
        name: string
        email: string,
        avatar: string,
    },
    Image: {
        url: string
    },
    Comments: [{
        id: number,
        body: string,
        User: {
            id: number,
            name: string,
            email: string,
            avatar: string
        },
        LikeComments: [{
            id: number
        }]
    }],
    LikePosts: [{
        id: number,
        idPost: number,
        idUser: number
    }]

}