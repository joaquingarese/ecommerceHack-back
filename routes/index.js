const productsRoutes = require("./productsRoutes");
const tokensRoutes = require("./tokensRoutes");
const usersRoutes = require("./usersRoutes");
const ordersRoutes = require("./ordersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
module.exports = (app) => {
  app.use("/tokens", tokensRoutes);
  app.use("/products", productsRoutes);
  app.use("/users", usersRoutes);
  app.use("/orders", ordersRoutes);
  app.use("/categories", categoriesRoutes);
};
