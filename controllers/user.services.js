const config = require("./../config.json");
const jwt = require("jsonwebtoken");
const users = require("./../models/userSchema");

async function signUpUser(user) {
  console.log(user);

  const isUserExist = await users.find({ email: user.email });

  if (isUserExist.length !== 0) throw "user alreay signup";

  const newUser = new users(user);
  newUser.save();

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });

  return { ...omitpasword(user), token };
}

async function loginUser(user) {
  let isUserExist = await users.find({ email: user.email });

  if (isUserExist.length === 0) throw "user not signup";
  console.log('login')

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });

  return { ...omitpasword(user), token };
}

async function getAllUsers() {
const allusers = await users.find({},{"password": 0});
return allusers

}

function omitpasword(user) {
  const { password, ...userwithoutpassword } = user;
  return userwithoutpassword;
}

module.exports = {
  signUpUser,
  loginUser,
  getAllUsers,
};
