const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  dueCategory: { 
    type: String, 
    enum: ['Today', 'Tomorrow', 'This Week', 'This Month'], 
    default: 'Today' 
  },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
