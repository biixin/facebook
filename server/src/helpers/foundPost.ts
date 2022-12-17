import { Posts } from "../types/FriendsPosts";

export const verifyPostExists = (array: Posts[], id: number ): boolean => {
    return array.some(
        post => {
            if (post.id === id) {
                return true;
            }
            return false;
        }
    );
}