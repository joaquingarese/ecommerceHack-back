require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const user = new User({
    firstname: "Alan",
    lastname: "Brito",
    email: "alan@brito.com",
    password: "123",
    phone: "099322333",
    address: "Avenida Italia 123",
    photo:
      "https://w7.pngwing.com/pngs/192/510/png-transparent-face-face-image-file-formats-face-photography.png",
  });

  await user.save();

  console.log("[Database] Se corrió el seeder de User.");
};
