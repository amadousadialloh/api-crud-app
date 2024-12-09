const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const PORT = process.env.PORT || 4000;
server.use(cors());
server.use(express.json());
const User = require("./models/user.js");

mongoose.connect(process.env.MongoDB_URI);
mongoose.connection.on("connected", () => {
  console.log(`connected to ${mongoose.connection.name}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error ${err}`);
});

server.post("/users", async (req, res) => {
  const createUser = await User.create(req.body);
  res.json(createUser);
});
server.get("/users", async (req, res) => {
  const findUser = await User.find();
  res.json(findUser);
});

server.put("/users/:userId", async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });
  res.json({ message: `updated user: ${updateUser.lastName}` });
});
server.delete("/users/:userId", async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.userId);
  res.json({ message: "User deleted" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
