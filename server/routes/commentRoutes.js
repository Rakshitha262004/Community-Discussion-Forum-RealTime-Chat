import express from 'express';
import { addComment, getCommentsByDiscussion } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/:discussionId', getCommentsByDiscussion);
router.post('/:discussionId', verifyToken, addComment);

export default router;