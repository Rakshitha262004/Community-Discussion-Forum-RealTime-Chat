import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { discussionId } = req.params;
    let comment = await Comment.create({
      discussionId, text, author: req.user.id
    });
    comment = await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Comment persistence injection failed', error: err.message });
  }
};

export const getCommentsByDiscussion = async (req, res) => {
  try {
    const comments = await Comment.find({ discussionId: req.params.discussionId })
                                  .populate('author', 'username')
                                  .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failure pulling relational comments data maps', error: err.message });
  }
};