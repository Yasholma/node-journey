const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 5, max: 255 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 1024 },
  isAdmin: { type: Boolean },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
