const { Schema, model } = require("mongoose");


const Post = new Schema
({
    message : { type : String , required:true} ,
    userId : { type : String },
    creationDate: { type: Date, default: new Date() }
})

module.exports = model('Post',Post);