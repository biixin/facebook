import { Router, Request } from 'express';
import * as Controller from '../controllers/Controller';
import * as AuthController from '../controllers/AuthController';
import * as PostController from '../controllers/PostController';
import * as FriendController from '../controllers/FriendController';
import * as ImageController from '../controllers/ImageController';
import * as LikeController from '../controllers/LikeController';
import * as CommentController from '../controllers/CommentController';

import { Auth } from '../middlewares/Auth';
import { AuthValidator } from '../validators/AuthValidator'
import { UserValidator } from './../validators/UserValidator';
import { Friend } from '../models/Friends';




const router = Router();

router.get('/ping', Controller.ping);

// Auth ---------
router.post('/auth/signup', AuthValidator.signup, AuthController.signup);
router.post('/auth/signin', AuthValidator.signin, AuthController.signin);
router.get('/auth/request', Auth.private, AuthController.AccountREQUEST);

// Users ------------

router.get('/user', Controller.getAllUsers);
router.post('/user', Controller.getOneUser);
router.put('/user/background', Controller.editBackgroundUser)
router.put('/user/profile', Controller.editProfileUser)
router.get('/users/suggest/:id', FriendController.GetSuggestList);


// Posts ------------

// router.get('/post', PostController.GetAll);
router.post('/post', PostController.AddPost);
router.post('/post/all', PostController.GetAllPosts);
router.post('/post/my', PostController.GetMyPosts);
router.post('/post/delete', PostController.DeletePost)
router.put('/post/edit', PostController.EditPost)


// Image -------
router.post('/image', ImageController.AddPhoto)
router.put('/image', ImageController.EditPhoto)

// Comment -------
router.post('/post/comment', CommentController.AddComment)
router.post('/post/comment/delete', CommentController.DeleteComment)

// Like ---------
router.post('/post/like', LikeController.AddPostLike)
router.post('/comment/like', LikeController.AddCommentLike)

// Friends -------
router.get('/friend/:id', FriendController.GetAllFriends)
router.post('/friend/sent', FriendController.Add)
router.get('/friend/requests/:id', FriendController.GetAllFriendRequests)
router.post('/friend/accept/', FriendController.AcceptFriendRequest)
router.post('/friend/reject/', FriendController.RejectFriendRequest)

export default router;