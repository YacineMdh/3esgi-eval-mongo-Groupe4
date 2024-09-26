const User = require("../model/user.model");
const Comment = require("./../model/comment.model");

/**
 * Méthode pour créer un nouveau commentaire
 * @body
 * {
 *     message: <string>,
 *     userId: <string>,
 *     postId: <string>
 * }
 */
exports.create = async (req, res) => {
    try{
        let comment = await Comment.create(req.body);
        res.status(201).json(comment);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Méthode pour modifier un commentaire
 * @param id l'id du commentaire à modifier
 * @body
 * {
 *     message: <string>,
 * }
 */
exports.update = async (req, res) => {
    try{
        const comment = await Comment.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { message: req.body.message } },
            { new: true, runValidators: true }
        );

        if (!comment) return res.status(404).json({ message: 'COMMENT_NOT_FOUND'});
        res.status(200).json({message: "Commentaire mis à jour"});
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Méthode pour supprimer un commentaire
 * @param id l'id du commentaire à supprimer
 */
exports.delete = async (req, res) => {
    try{
        let comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) return res.status(404).json({ message: "COMMENT_NOT_FOUND" });

        res.status(200).json({message: "Commentaire supprimé"});
    }catch(e){
        res.status(500).json(e.message);
    }
}