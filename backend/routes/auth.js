const mongoose = require("mongoose");
const express = require("express");
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_TOKEN = "shhh";
// Parse JSON and URL-encoded data
const router = express.Router();

//Route 1: Create a User using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("Email", "Enter a valid Email").isEmail(),
    body(
      "Name",
      "Enter a valid Name (Must have 3 characters atleast)"
    ).isLength({ min: 3 }),
    body("Password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.Email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, An User with this email already exists" });
      }
      //Create a new User
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.Password, salt);
      user = await User.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: securePass,
      });
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Email is already taken"})})
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Fatal error occurred!");
    }
  }
);

//Route 2: Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("Email", "Enter a valid Email").isEmail(),
    body("Password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return bad requests andthe errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { Email, Password } = req.body;
    try {
      let user = await User.findOne({ Email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const compPassword = await bcrypt.compare(Password, user.Password);
      if (!compPassword) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occurred!");
    }
  }
);

// Route 3: Get loggedin User details using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred!");
  }
});
module.exports = router;
