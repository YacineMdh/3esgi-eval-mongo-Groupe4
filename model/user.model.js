/**
 * Créer ici le model pour user
 * 
 * Un user doit avoir au minimum : un login (unique) et un mot de passe
 */

const { Schema, model } = require("mongoose");

const user = new Schema
({
    login : { type : String , required:true, unique:true} ,
    password :{type : String, required:true},
    username: {type: String, required:false}

})

module.exports = model('User',user);