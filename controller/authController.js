const { login, register } = require("../services/authDb");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await login(email, password);

    res
      .header("authorization", `Bearer ${loggedUser.token}`)
      .status(200)
      .send(loggedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const registeredUserId = await register(name, email, password);
    res.status(200).send(registeredUserId);
  } catch (e) {
    res.status(500).json({ error: e.stack });
  }
};

module.exports = {
  postLogin,
  postRegister,
};
