const Joi = require("joi");
const User = require("../Models/UserM");

const registerV = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    adresse: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).send("Mot de pass non identique");

  const emailV = await User.findOne({ email: req.body.email });
  const phoneV = await User.findOne({ phone: req.body.phone });

  if (emailV || phoneV) {
    let message = "Email et numéros de téléphone déja utiliser";
    if (emailV && !phoneV) {
      message = "Email déja utiliser";
    } else if (!emailV && phoneV)
      message = "Numeros de téléphone déja utiliser";

    return res.status(400).send({ message: message });
  }

  next();
};
const loginV = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error);
  next();
};
module.exports = { registerV, loginV };
