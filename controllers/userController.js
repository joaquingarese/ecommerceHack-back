const { User, Admin } = require("../models");
const bcrypt = require("bcryptjs");

async function index(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function store(req, res) {
  try {
    const newUser = await User.create({
      firstname: req.body.firstnameReg,
      lastname: req.body.lastnameReg,
      email: req.body.emailReg,
      password: req.body.passwordReg,
    });

    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function destroy(req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    return res.status(200).json("OK");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function update(req, res) {
  try {
    const userId = req.params.id;
    // req.body.password = await bcrypt.hash(req.body.password, 8);
    if (req.body.isAdmin) {
      const admin = await Admin.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });

      await admin.save();

      await User.deleteOne({ email: req.body.email });
      return res.status(200).send("Moved to admin and Deleted");
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          address: req.body.address,
          photo: req.body.photo,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  index,
  show,
  store,
  destroy,
  update,
};
