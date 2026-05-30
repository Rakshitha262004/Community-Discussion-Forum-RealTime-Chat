import Discussion from '../models/Discussion.js';

export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const discussion = await Discussion.create({
      title, content, category, creator: req.user.id
    });
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ message: 'Could not create discussion context', error: err.message });
  }
};

export const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('creator', 'username').sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Failed fetching discussions data metrics', error: err.message });
  }
};

export const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id).populate('creator', 'username');
    if (!discussion) return res.status(404).json({ message: 'Discussion frame item not found' });
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: 'Error analyzing requested forum identifier', error: err.message });
  }
};