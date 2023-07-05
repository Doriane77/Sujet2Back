const dotenv = require("dotenv");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Models/UserM");

const register = async (req, res) => {
  try {
    const { name, surname, adresse, email, phone, password } = req.body;

    const user = new User({
      name: name,
      surname: surname,
      adresse: adresse,
      email: email,
      phone: phone,
      password: password,
      play: 5,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("Utilisateur enregistrer avec succée ");
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        adresse: user.adresse,
        email: user.email,
        phone: user.phone,
        play: user.play,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email: email });
    }

    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    const verifPassword = await bcrypt.compare(password, user.password);
    if (!verifPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Générer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Renvoyer la réponse avec le token et les informations de l'utilisateur
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        adresse: user.adresse,
        email: user.email,
        phone: user.phone,
        play: user.play,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };
