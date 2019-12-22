const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = async (req, res, next) => {
  const token = req.headers["x-dark-token"] || req.headers["authorization"] || req.cookie['x-dark-token'];

  if (!token) return res.sendStatus(401).redirect('http://localhost:3000/login');

  try {
    const decoded = await jwt.verify(token, config.get("myprivatekey"));

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
};