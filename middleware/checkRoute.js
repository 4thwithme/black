const path = require("path");

module.exports = async (req, res, next) => {
  if (req.path.startWith("/api")) {
    next();
  } else {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
    next();
  }
};
