const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware for JWT validation
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Get all todos for the user
router.get('/', protect, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new todo
router.post('/', protect, async (req, res) => {
  const { task, priority = 'Low', dueCategory = 'Today' } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  try {
    const todo = await Todo.create({
      task,
      userId: req.userId,
      priority,
      dueCategory
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update todo
router.put('/:id', protect, async (req, res) => {
  const { task, completed, priority, dueCategory } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueCategory !== undefined) todo.dueCategory = dueCategory;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete todo
router.delete('/:id', protect, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
