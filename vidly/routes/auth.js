const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { validateRegister, validateLogin } = require("../utils");
const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = Router();

// get user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).send("No User found");
    res.send(user);
  } catch (error) {
    res.send("error");
  }
});

// register
router.post("/users", async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.send(error.details[0].message);

  //   check if user already exist
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  try {
    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .status(201)
      .send(_.pick(user, ["name", "email"]));
  } catch (error) {
    console.error(`An error occured: ${error.message}`);
    res.send("error");
  }
});

// login
router.post("/login", async (req, res) => {
  // login user
  const { error } = validateLogin(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    //   generate a token
    const token = user.generateAuthToken();

    res.send(token);
  } catch (error) {
    console.error(`Error loging in: ${error.message}`);
    res.send("error");
  }
});

module.exports = router;
