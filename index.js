const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("config");
const { onConnectSocket } = require("./socket/socket");
const cloudinary = require("cloudinary").v2;
const credentials = require("./config/dbCreds");

const usersRoute = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const chatRouter = require("./routes/chat.route");

const port = 9999;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-dark-token"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  next();
});

app.use(cookieParser());

app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "50mb" }));

app.use("/api/users", usersRoute);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

mongoose
  .connect(
    `mongodb+srv://${credentials}@cluster0-3afw5.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    if (!config.get("myprivatekey")) {
      process.exit(1);
    }
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);

      cloudinary.config({
        cloud_name: "dy0mga9td",
        api_key: "633915665754871",
        api_secret: "9mZD9yNLlkFkY5OEnqCtU5pHTEA"
      });

      onConnectSocket();
    });
  })
  .catch((err) => console.error(err));
