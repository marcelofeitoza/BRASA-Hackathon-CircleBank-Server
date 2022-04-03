const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const Models = require("../database/models");
const User = Models.User;

const verifyIfUserExists = async (email) => {
  const emailExists = await User.findOne({ where: { email } });
  return emailExists;
};

const register = async (name, email, password) => {
  try {
    const emailExists = await verifyIfUserExists(email);

    if (emailExists) {
      throw new Error("Email already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(`passowrdH: ${hashedPassword}`);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const response = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
    return { user: response };
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (email, password) => {
  try {
    const user = await verifyIfUserExists(email);
    if (!user) {
      throw new Error("Wrong user or password");
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return { user: user.dataValues, token };
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = { register, login };
