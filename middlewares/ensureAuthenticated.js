const { expressjwt: checkJwt } = require("express-jwt");

module.exports = checkJwt({
  secret: process.env.APP_SECRET,
  algorithms: ["HS256"],
});
