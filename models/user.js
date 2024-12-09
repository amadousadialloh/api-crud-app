const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
