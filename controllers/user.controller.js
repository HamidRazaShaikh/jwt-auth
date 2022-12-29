const express = require("express");
const router = express.Router();
const userService = require("./user.services");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", users);

module.exports = router;

async function signup(req, res, next) {

    
  userService
    .signUpUser(req.body)
    .then((user) => res.send(user))
    .catch(next);
}

async function login(req, res, next) {
    userService
      .loginUser(req.body)
      .then((user) => res.send(user))
      .catch(next);
  }

async function users(req, res, next) {
  userService
    .getAllUsers()
    .then((users) => res.send(users))
    .catch(next);
}
