const User = require("./../model/user.model");
const bcrypt = require("bcrypt");

/**
 * Methode pour la connexion utilisateur
 * @body
 * {
 *     email: <string>,
 *     password: <string>
 * }
 */
exports.login = async (req, res) => {
  const { login, password } = req.body;
  if (!login) return res.status(400).json({ message: "LOGIN_REQUIRED" });
  if (!password) return res.status(400).json({ message: "PASSWORD_REQUIRED" });

  try {
    let user = await User.findOne({ login });
    if (!user) {
      return res.status(404).json("User not found");
    }
    let validPassword = await bcrypt.compareSync(
      password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/**
 * Méthode pour la création d'un compte utilisateur
 * @body
 * {
 *     email: <string>,
 *     password: <string>,
 *     username: <string>
 * }
 */
exports.signin = async (req, res) => {
  if (!req.body.login) return res.status(400).send({ message: "LOGIN_REQUIRED" });
  if (!req.body.password) return res.status(400).send({ message: "PASSWORD_REQUIRED" });

  try {
    let newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    let user = await User.create(newUser);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
