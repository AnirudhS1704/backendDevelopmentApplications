const { default: mongoose } = require("mongoose");

// Define the todo schema
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});
  
// Define the todo model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;