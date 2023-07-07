const Patries = require("../Models/PatriesM");

const register = async (req, res) => {
  try {
    const { name, number, image } = req.body;
    let num = 1;
    let nombre = await Patries.find();
    const patrie = new Patries({
      name: name,
      number: number,
      image: image,
      order: nombre.length + num,
    });
    await patrie.save();
    res.status(201).json({
      message: "Patisserie enregister avec succées",
      patrie: {
        id: patrie._id,
        name: patrie.name,
        number: patrie.number,
        image: image,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const allPatries = async (req, res) => {
  try {
    const patries = await Patries.find();
    res.status(201).json(patries);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { register, allPatries };
