require("dotenv").config();
const { mongoose } = require("../db");
const { Category } = require("../models");

module.exports = categorySeeder = async () => {
  const categories = [
    {
      name: "Cápsulas",
    },
    {
      name: "Granos Clásicos",
    },
    {
      name: "Granos Especiales",
    },
    {
      name: "Cafés Saborizados",
    },
    {
      name: "Café Descafeinado",
    },
  ];

  await Category.insertMany(categories);

  console.log("[Database] Se corrió el seeder de Categories.");
};
