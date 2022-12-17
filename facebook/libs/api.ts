import axios from "axios";
import nookies, { parseCookies } from 'nookies'

axios.defaults.baseURL = 'http://localhost:8819'

const cookies = parseCookies()
const token = cookies['token']
if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


export default {
    
    // Auth

    Signin: async (email: string, password: string) => {
        let response = await axios.post('/auth/signin', {
            email, password
        })
        return response.data
    },
    Signup: async (name: string, email: string, password: string) => {
        let response = await axios.post('/auth/signup', {
            name, email, password
        })
        return response.data
    },


    Request: async (token: string) => {
        try {
            let response = await axios.get("auth/request");
            return response.data
        } catch (err) {
            if(axios.isAxiosError(err)) {
                return err
            }
        }
    },



    // Users

    getAllUsers: async () => {
        let response = await axios.get('/user')
        return response.data
    },
    getOneUser: async (id: string) => {
        try {
            let response = await axios.post('/user', {
                id
            })
            return response.data
        } catch (error) {
            let message;
            if(axios.isAxiosError(error) && error.response) {
                message = error.response.data.message;
            }
        }
    },
    EditBackgroundUser: async (background: string, id: number) => {
        let response = await axios.put('/user/background', {
            background, id
        })
        return response.data
    },
    EditProfileUser: async (profile: string, id: number) => {
        let response = await axios.put('/user/profile', {
            profile, id
        })
        return response.data
    },

    // Posts

    GetAllPosts: async (idUser: number) => {
        let response = await axios.post('/post/all', {
            idUser
        })
        return response.data
    },
    GetMyPosts: async (idUser: string) => {
        try {
            let response = await axios.post('/post/my', {
                idUser
            })
            return response.data
        } catch (error) {
            
        }
    },
    AddPost: async (idUser: number, body: string) => {
        let response = await axios.post('/post', {
            idUser, body
        })
        return response.data
    },

    AddPostComment: async (idUser: number, idPost: number, body: string) => {
        let response = await axios.post('/post/comment', {
            idUser, idPost, body
        })
        return response.data
    },

    DeleteComment: async (idUser: number, idComment: number) => {
        let response = await axios.post(`/post/comment/delete`, {
            idUser, idComment
        })
        return response.data
    },

    DeletePost: async (idUser: number, idPost: number) => {
        let response = await axios.post(`/post/delete`, {
            idUser, idPost
        })
        return response.data
    },

    EditPost: async (idUser: number, idPost: number, body: string) => {
        let response = await axios.put(`/post/edit`, {
            idUser, idPost, body
        })
        return response.data
    },



    // Image

    AddImage: async (idPost: number, ref: string, url: string) => {
        let response = await axios.post('/image', {
            idPost, ref, url
        })
        return response.data
    },
    EditImage: async (idPost: number, ref: string, url: string) => {
        let response = await axios.put('/image', {
            idPost, ref, url
        })
        return response.data
    },

    // Like

    LikePost: async (idUser: number, idPost: number) => {
        let response = await axios.post('/post/like', {
            idUser, idPost
        })
        return response.data
    },

    LikeComment: async (idUser: number, idComment: number) => {
        let response = await axios.post('/comment/like', {
            idUser, idComment
        })
        return response.data
    },

    // Suggest

    getSuggestList: async (id: number) => {
        let response = await axios.get(`/users/suggest/${id}`)
        return response.data
    },

    // Friends

    getAllFriends: async (to: number) => {
        let response = await axios.get(`/friend/${to}`)
        return response.data
    },

    sentFriendRequest: async (from: number, to: number) => {
        let response = await axios.post(`/friend/sent`, {
            from, to
        })
        return response.data
    },

    getAllRequestFriends: async (id: number) => {
        let response = await axios.get(`/friend/requests/${id}`)
        return response.data
    },

    acceptFriendRequest: async (from: number, to: number) => {
        let response = await axios.post(`/friend/accept`, {
            from, to
        })
        return response.data
    },
    rejectFriendRequest: async (from: number, to: number) => {
        let response = await axios.post(`/friend/reject`, {
            from, to
        })
        return response.data
    },

};


