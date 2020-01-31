const path = require("path");

module.exports = async (req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
    // next();
  }
  next();
};
