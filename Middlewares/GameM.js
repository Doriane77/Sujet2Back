const Joi = require("joi");
const User = require("../Models/UserM");

const gameV = async (req, res, next) => {
  // const schema = Joi.object({
  //   num1: Joi.number().required(),
  //   num2: Joi.number().required(),
  //   num3: Joi.number().required(),
  //   num4: Joi.number().required(),
  //   num5: Joi.number().required(),
  // });
  // console.log("OK: 4");
  // const result = schema.validate(req.body);
  // if (result.error) return res.status(400).send(result.error);
  // console.log("req.user: ", req.user);
  // console.log("OK: 5");

  const userV = req.user;

  if (userV.play === 0) {
    return res
      .status(400)
      .send({ message: "Dommage ! Vous avez utiliser vos 5 chances." });
  }

  next();
};
module.exports = { gameV };
