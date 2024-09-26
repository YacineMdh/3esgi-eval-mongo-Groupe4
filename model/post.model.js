const { Schema, model } = require("mongoose");


const Post = new Schema
({
    message : { type : String , required:true} ,
    userId : { type : String },
})

module.exports = model('Post',Post);