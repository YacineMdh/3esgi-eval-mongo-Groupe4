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
    try {
        let user = await User.findOne({ "login": req.body.login });
        if (!user) {
            return res.status(404).json("User not found");
        }
        console.log(req.body.password)
        console.log(user)
        let validPassword = await bcrypt.compareSync(req.body.password,user.password);
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
exports.signin= async (req,res) => {
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

