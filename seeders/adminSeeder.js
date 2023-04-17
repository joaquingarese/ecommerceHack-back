require("dotenv").config();
const { Admin } = require("../models");

module.exports = async () => {
  const admin = new Admin({
    firstname: "Admin",
    lastname: "Admin",
    email: "admin@admin.com",
    password: "123",
  });

  await admin.save();

  console.log("[Database] Se corrió el seeder de admin.");
};
