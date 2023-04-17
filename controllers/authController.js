const { User, Admin } = require("../models");
const jwt = require("jsonwebtoken");
const { findOneAndDelete } = require("../models/User");

async function token(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Credenciales Incorrectas" });
    }

    const checkHash = await user.passwordCheck(req.body.password);

    if (!checkHash) {
      return res.status(401).json({ message: "Credenciales Incorrectas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET);
    res.json({ token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function adminToken(req, res) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({ message: "Credenciales Incorrectas" });
    }

    const checkHash = await admin.passwordCheck(req.body.password);

    if (!checkHash) {
      return res.status(401).json({ message: "Credenciales Incorrectas" });
    }

    const token = jwt.sign({ id: admin.id }, process.env.SESSION_SECRET);
    res.json({ token: token, admin: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  token,
  adminToken,
};
