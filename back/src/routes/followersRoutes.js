import express from 'express';
import followController from '../controllers/followers/followerController.js';

const router = express.Router();

router.post('/f', followController.follow);
router.post('/un', followController.unfollowUser);
router.get('/followers/:user_id', followController.getFollowers);
router.post('/reaction', followController.setFollowsAndReaction);

export default router;
