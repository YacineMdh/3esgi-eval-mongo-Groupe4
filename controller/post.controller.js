const Post = require("./../model/post.model");
const Comment = require("./../model/comment.model");

/**
 * Methode pour récupérer 10 post (les plus récents) par page
 * @param page le numéro de la page actuelle
 * Si la page est 1 il faut récupérer les 10 post les plus récents
 * Si la page est 2 il faut récupérer les post du 11ème au 20ème les plus récents
 * ...
 */
exports.getAll = async (req,res) => {
    let page = req.params.page
    if (!page) return res.status(400).send({ message: "PAGE_REQUIRED" });
    try{
        if (page == 1 ) {
            let listPost = await Post.find().sort({ creationDate: 1 }).limit(10)
            res.status(200).json(listPost);
        }
        else {
            let listPost = await Post.find().sort({ creationDate: 1 }).skip((page-1)*10).limit(10)
            res.status(200).json(listPost);
        }
        
       
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour récupérer un post par son id, et les commentaires associés à ce post
 */
exports.getById = async (req,res) => {
    if (!req.params.id) return res.status(400).send({ message: "ID_REQUIRED" });
    try{
        let id = req.params.id
        let _post = await Post.findOne({"_id":id})
        let _comments = await Comment.find({"postId":id})
        let result = {
            post: _post, 
            comments: _comments
        };

        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour créer un nouveau post (attention à bien enregistrer la date de création)
 * @body
 * {
 *     message: <string>,
 *     userId: <string>
 * }
 */
exports.create = async (req,res) => {
    const { message, userId } = req.body;
    if (!message) return res.status(400).send({ message: "MESSAGE_REQUIRED" });
    if (!userId) return res.status(400).send({ message: "USERID_REQUIRED" });
    try{
        let post = await Post.create({
            message: req.body.message,
            userId: req.body.userId ,
          })
        res.status(201).json(post);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour modifier un post (attention de bien mettre à jour la date du post)
 * @param id l'id du post à modifier
 * @body
 * {
 *     message: <string>
 * }
 */
exports.update = async (req,res) => {
    const { message, userId } = req.body;
    if (!message) return res.status(400).send({ message: "MESSAGE_REQUIRED" });


  
    try {
        let result = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } }, 
            { new: true } 
        );

        if(result == null) {
            res.status(405).send("user not found")
        }

        res.status(201).json({message: "Post mis à jour"});
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour supprimer un post (attention de bien supprimer les commentaires associés)
 * @param id l'id du post à supprimer
 */
exports.delete = async (req,res) => {
    const { id } = req.params;
    if (!id) return res.status("ID_REQUIRED");

    try{
        let result = await Post.deleteOne({"_id": id})
        result = await Comment.deleteMany({"postId": id})
        res.status(200).send(result);
    }catch(e){
        res.status(500).json(e.message);
    }
}
