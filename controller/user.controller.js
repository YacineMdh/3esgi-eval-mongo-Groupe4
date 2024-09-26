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
exports.login = async (req,res) => {
    try{
        let user = await User.findByEmail(req.body.email);
        res.status(200).json(user);
    }catch(e){
        res.status(500).json(e.message);
    }
}

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

