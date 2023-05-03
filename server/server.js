const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Todo = require('./models/Todo');
const Account = require('./models/Account');

mongoose
  .connect(
    // SERVER KEY BEING SHOWN CHANGE IMMEDIATELY IDIOTTTTTTTTTT
    'mongodb+srv://chrisrosa815518:ShadowStory518@loouze.twwf1q6.mongodb.net/mern-todo',
    {
      useNewurlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to Db'))
  .catch(console.error);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.put('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.post('/register', async (req, res) => {
  const { username, password, email } = res.body;

  if ((username = Account.findOne(username))) {
    return res.send({ error: 'Username exists' });
  }
  try {
  } catch (error) {}
});

app.listen(3001, () => console.log('Server Started on port 3001'));
