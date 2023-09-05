// Import the required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./Models/Todo');

// Create an express app
const app = express();

// Use JSON middleware to parse request body
app.use(express.json());

// Connect MongoDb
const password = process.env.MONGO_PASSWORD;
console.log(password);
mongoose.connect('mongodb+srv://anirudhsuma2003:' + password + '@cluster0.wpeiyw8.mongodb.net/?retryWrites=true&w=majority');

// Define API routes

// Get all todos
app.get('/all-todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single todo by id
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const title = req.body.title;
    const completed = req.body.completed || false;
    if (title) {
      const todo = new Todo({
        title,
        completed,
      });
      await todo.save();
      res.status(201).json(todo);
    } else {
      res.status(400).json({ error: 'Title is required' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing todo by id
app.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const completed = req.body.completed;
    if (title || completed !== undefined) {
      const todo = await Todo.findById(id);
      if (todo) {
        todo.title = title || todo.title;
        todo.completed = completed ?? todo.completed;
        await todo.save();
        res.json(todo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } else {
      res.status(400).json({ error: 'Title or completed is required' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an existing todo by id
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (todo) {
      await Todo.deleteOne({_id: id});
      res.json('Deleted successfully');
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server on port 3000
app.listen(4000, () => {
  console.log('Server is running on port 3000');
});