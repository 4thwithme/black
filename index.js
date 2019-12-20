const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const config = require("config");
const { onConnectSocket } = require('./socket/socket');

const usersRoute = require("./routes/user.route");
const authRouter = require('./routes/auth.route');
const chatRouter = require('./routes/chat.route');

const port = process.env.PORT || 9999;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-dark-token');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  next();
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

mongoose
  .connect("mongodb://localhost/black", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    if (!config.get("myprivatekey")) {
      process.exit(1);
    }
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);

      onConnectSocket();
    });
  })
  .catch(err => console.error(err));