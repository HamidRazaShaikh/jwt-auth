require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user_Router = require("./controllers/user.controller");
const jwt = require("./helpers/jwt");


const {secret} = require("./config.json");
// const { expressjwt: jwt } = require("express-jwt");


const connectDB = require("./db/connection");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(jwt());

app.use("/users", user_Router);
 
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
