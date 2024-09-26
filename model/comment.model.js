/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post) et un postId
 */

const { Schema, SchemaTypes, model } = require('mongoose');

const Comment = new Schema({
    message: { type: SchemaTypes.String, required: true },
    date: { type: SchemaTypes.Date, default: new Date() },
    userId: { type: SchemaTypes.ObjectId, required: true },
    postId: { type: SchemaTypes.ObjectId, required: true }
})

module.exports = model('comment', Comment);