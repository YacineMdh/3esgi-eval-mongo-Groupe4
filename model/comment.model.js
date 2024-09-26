/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post) et un postId
 */

const { Schema, SchemaTypes, model } = require('mongoose');

const Comment = new Schema({
    message: { type: SchemaTypes.String, required: true },
    userId: { type: SchemaTypes.String, required: true },
    postId: { type: SchemaTypes.String, required: true }
})

module.exports = model('comment', Comment);