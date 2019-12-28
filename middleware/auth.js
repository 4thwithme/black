const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = async (req, res, next) => {
  const token = req.headers["x-dark-token"] || req.headers["authorization"] || req.cookie['x-dark-token'];

  if (!token) return res.sendStatus(666);

  try {
    const decoded = await jwt.verify(token, config.get("myprivatekey"));

    req.user = decoded;
    next();
  } catch (e) {
    res.status(666).send("Invalid token.");
  }
};