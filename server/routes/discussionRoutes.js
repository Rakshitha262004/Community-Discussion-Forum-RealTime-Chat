import express from 'express';
import { createDiscussion, getAllDiscussions, getDiscussionById } from '../controllers/discussionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getAllDiscussions).post(verifyToken, createDiscussion);
router.get('/:id', getDiscussionById);

export default router;