const Game = require("../Models/GameM");
const User = require("../Models/UserM");
const Patries = require("../Models/PatriesM");

const winners = async (req, res) => {
  try {
    const allWinners = await Game.find().populate([
      {
        path: "players",
        model: User,
        select: "-password -play",
      },
      { path: "patries", model: Patries, select: "-number -order" },
    ]);

    res.status(201).json(allWinners);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const play = async (req, res) => {
  try {
    // const { num1, num2, num3, num4, num5 } = req.body;
    const num1 = Math.floor(Math.random() * 6) + 1;
    const num2 = Math.floor(Math.random() * 6) + 1;
    const num3 = Math.floor(Math.random() * 6) + 1;
    const num4 = Math.floor(Math.random() * 6) + 1;
    const num5 = Math.floor(Math.random() * 6) + 1;

    console.log("NUM =>", num1, num2, num3, num4, num5);
    const numbers = [num1, num2, num3, num4, num5];

    const identicalNumbers = numbers.filter(
      (number, index, array) => array.indexOf(number) !== index
    );
    const areAllNumbersIdentical = numbers.every(
      (number) => number === identicalNumbers[0]
    );
    const verifnum = identicalNumbers.every(
      (number) => number === identicalNumbers[0]
    );

    let winnings = 0;
    let result = "";

    // Vérifier si c'est un Yams (5 dés identiques)
    if (areAllNumbersIdentical) {
      winnings = 3;
      result = "Yams ! Vous gagner 3 patisserie !";
    }
    // Vérifier si c'est un carré (4 dés identiques)
    else if (identicalNumbers.length === 3 && verifnum) {
      winnings = 2;
      result = "Carré ! Vous gagner 2 patisserie !";
    }
    // Vérifier si c'est une double (2 paires)
    else if (identicalNumbers.length >= 2) {
      winnings = 1;
      result = "Double ! Vous gagner 1 patisserie !";
    } else {
      result = `Aucun gain ! Il vous reste ${req.user.play - 1} chance !`;
    }
    let gain = [];
    if (winnings !== 0) {
      await User.findOneAndUpdate({ _id: req.user._id }, { play: 0 });

      for (let i = 1; i <= winnings; i++) {
        let patrie = await Patries.find({ number: { $gt: 0 } });
        let orderPatrie = Math.floor(Math.random() * patrie.length) + 1;
        let choicePatrie = await Patries.findOne({ order: orderPatrie });
        await Patries.findOneAndUpdate(
          { _id: choicePatrie._id },
          { $inc: { number: -1 } }
        );
        gain.push(choicePatrie);
      }

      const winner = new Game({
        players: req.user._id,
        patries: gain,
      });
      await winner.save();
    }
    await User.findOneAndUpdate({ _id: req.user._id }, { $inc: { play: -1 } });
    res.status(201).json({ message: result, numeros: numbers, gain: gain });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { play, winners };
