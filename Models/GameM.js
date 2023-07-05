const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pastries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patries" }],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
