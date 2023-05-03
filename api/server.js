const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://chrisrosa815518:ShadowStory518@loouze.twwf1q6.mongodb.net/mern-todo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Db"))
  .catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.listen(3001, () => console.log("Server Started on port 3001"));
