const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },

  password: String,
});

const Todo = new Schema({
  userId: ObjectId,

  title: String,
  done: Boolean,
});

const UserModel = mongoose.model("User", User);
const TodoModel = mongoose.model("Todo", Todo);
module.exports = {
  UserModel,
  TodoModel,
};
