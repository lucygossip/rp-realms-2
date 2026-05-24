const Character = require("../models/Character.model");

const createCharacter = async (req, res) => {
  try {
    const { name, race, class: charClass, age, traits, backstory } = req.body;

    const character = await Character.create({
      owner: req.user._id,
      name,
      race,
      class: charClass,
      age,
      traits: traits || [],
      backstory,
    });

    res.status(201).json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // optional safety: only owner or admin can view full edit version later
    res.json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    if (character.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    if (character.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await character.deleteOne();

    res.json({ message: "Character deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCharacter,
  getMyCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};