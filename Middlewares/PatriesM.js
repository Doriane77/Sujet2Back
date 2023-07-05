const Joi = require("joi");
const Patries = require("../Models/PatriesM");

const registerV = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    number: Joi.number().required().min(0),
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error);
  const name = await Patries.findOne({ name: req.body.name });
  if (name) {
    return res
      .status(400)
      .send({ message: "Cette pattiserie est déja enregister" });
  }
  next();
};

module.exports = { registerV };
