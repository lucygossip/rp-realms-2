const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createCharacter,
  getMyCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/character.controller");

router.use(protect);

// GET all my characters
router.get("/me", getMyCharacters);

// CREATE character
router.post("/", createCharacter);

// GET single character
router.get("/:id", getCharacterById);

// UPDATE character
router.put("/:id", updateCharacter);

// DELETE character
router.delete("/:id", deleteCharacter);

module.exports = router;