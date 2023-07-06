const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  patries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patries" }],
  timestamp: { type: Date, default: Date.now, get: formatTimestamp },
});
function formatTimestamp(timestamp) {
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("fr-FR", options).format(
    timestamp
  );
  return formattedDate;
}

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
