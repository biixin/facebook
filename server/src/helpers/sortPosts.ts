import { Posts } from "../types/FriendsPosts";

export const sortPostByDate = (array: Posts[]) => {
    return array.sort((a, b) => b.date.getTime() - a.date.getTime())
}