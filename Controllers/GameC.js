const Game = require("../Models/GameM");
const User = require("../Models/UserM");
const Patries = require("../Models/PatriesM");

const play = async (req, res) => {
  try {
    const { num1, num2, num3, num4, num5 } = req.body;
    // const num1 = Math.floor(Math.random() * 6) + 1;
    // const num2 = Math.floor(Math.random() * 6) + 1;
    // const num3 = Math.floor(Math.random() * 6) + 1;
    // const num4 = Math.floor(Math.random() * 6) + 1;
    // const num5 = Math.floor(Math.random() * 6) + 1;

    console.log("NUM =>", num1, num2, num3, num4, num5);

    let winnings = 0;
    let result = "";

    // Vérifier si c'est un Yams (5 dés identiques)
    if (num1 === num2 && num1 === num3 && num1 === num4 && num1 === num5) {
      winnings = 3;
      result = "Yams ! Vous gagner 3 patisserie";
    }
    // Vérifier si c'est un carré (4 dés identiques)
    else if (
      (num1 === num2 && num1 === num3 && num1 === num4) ||
      (num2 === num3 && num2 === num4 && num2 === num5)
    ) {
      winnings = 2;
      result = "Carré ! Vous gagner 2 patisserie";
    }
    // Vérifier si c'est une double (2 paires)
    else if (
      (num1 === num2 && num1 !== num3 && num1 !== num4 && num1 !== num5) ||
      (num2 === num3 && num2 !== num1 && num2 !== num4 && num2 !== num5) ||
      (num3 === num4 && num3 !== num1 && num3 !== num2 && num3 !== num5) ||
      (num4 === num5 && num4 !== num1 && num4 !== num2 && num4 !== num3)
    ) {
      winnings = 1;
      result = "Double ! Vous gagner 1 patisserie";
    } else {
      result = "Aucun gain !";
    }
    if (winnings !== 0) {
      let patrie = await Patries.find();
      console.log("patrie: ", patrie);
    }
    res.send({ meesage: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { play };
