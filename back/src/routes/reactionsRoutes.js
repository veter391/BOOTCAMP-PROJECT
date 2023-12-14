import express from 'express';
import reactionController from '../controllers/reactions/reactionController.js';

const router = express.Router();

router.post('/add', reactionController.addReactionToPost);
router.get('/get/:post_id', reactionController.getReactionsForPost);
<<<<<<< HEAD
router.put('/update/:post_id/:user_id', reactionController.updateReaction);
router.delete('/delete/:post_id/:user_id', reactionController.deleteReaction);

export default router;
=======
// router.put('/update/:post_id/:user_id', reactionController.updateReaction);
router.delete('/delete/:post_id/:user_id', reactionController.deleteReaction);

export default router;
>>>>>>> fixedBugsBack/jose
