const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

//Router 1: Get All the Notes using: GET "/api/auth/fetchAllNotes". Login Required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred!");
  }
});
//Router 2: Add a new note using: POST "/api/auth/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title (Minimum 3 characters)").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must contain atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occurred!");
    }
  }
);
module.exports = router;
