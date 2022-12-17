
import Posts from './../components/Posts/index';

type Comments = {
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
}

export const sortPostById = (array: Comments[]) => {
    return array.sort((a, b) => a.id - b.id )
}