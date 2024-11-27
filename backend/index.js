const express = require("express");
const cors = require("cors");
const { UserModel, TodoModel } = require("./db");
const app = express();
const JWT_SECRET = "nikhil123";
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(401).send({ error: "Please authenticate." });
  }
}
app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });
  res.json({
    message: "User created successfully",
  });
});
app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(response);
  if (response) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "incorrect credential",
    });
  }
});
app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});
app.get("/todos", auth, async function (req, res) {
  try {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });

    res.json({
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching todos.",
    });
  }
});
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from the URL
  console.log("Deleting Todo ID:", req.params.id);
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id); // Delete task from database
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" }); // Return 404 if not found
    }
    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params; // Extract ID from the URL
  const { title, description } = req.body; // Get updated fields from the request body

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function main() {
  mongoose.connect(
    "mongodb+srv://nikhilwagh:EC3DLx1nsneoO5OH@cluster0.i8ue7.mongodb.net/todo-app-demo"
  );

  app.listen(3000);
  console.log("port 3000 runing...");
}

main();
