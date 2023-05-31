app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (await Account.findOne({ email })) {
    console.log("username exists");
    return res.send({ error: "Username exists" });
  }

  try {
    const account = new Account({
      username: username,
      email: email,
      password: password,
    });
    account.save();
    res.send({ status: "Ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Account.findOne({ username });
  if (password === user.password) {
    res.send({ status: "ok" });
    console.log("Sign in successful");
  } else {
    res.send({ error: "Wrong Password" });
    console.log("Sign in FAILED");
  }
});
