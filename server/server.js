const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Todo = require('./models/Todo');
const Account = require('./models/Account');

// SERVER KEY BEING SHOWN CHANGE IMMEDIATELY IDIOTTTTTTTTTT
mongoose
  .connect(
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
  const { username, password, email } = req.body;

  if (await Account.findOne({ email })) {
    console.log('username exists');
    return res.send({ error: 'Username exists' });
  }

  try {
    const account = new Account({
      username: username,
      email: email,
      password: password,
    });
    account.save();
    res.send({ status: 'Ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Account.findOne({ username });
  console.log(user);
});

app.listen(3001, () => console.log('Server Started on port 3001'));
