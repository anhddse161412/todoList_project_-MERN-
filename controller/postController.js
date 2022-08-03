const postModels = require("../models/post");

class postController {
   async getAllPost(req, res) {
      try {
         const allPost = await postModels.find();
         res.json(allPost);
      } catch (error) {
         res.status(500).json({ message: message });
      }
   }

   async getPost(req, res) {
      res.json(res.post);
   }
   async createPost(req, res) {
      const post = postModels({
         title: req.body.title,
         description: req.body.description,
      });
      try {
         const newPost = await post.save();
         res.json(newPost);
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   }

   async updatePost(req, res) {
      let post = res.post;
      const updatePost = postModels({
         title: req.body.title,
         description: req.body.description,
      });
      post.title = updatePost.title;
      post.description = updatePost.description;
      try {
         const updatedPost = await post.save();
         res.json(updatedPost);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
   async deletePost(req, res) {
      try {
         await res.post.remove();
         res.json({ message: `deleted post'id : ${res.post.id}` });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
   async findPost(req, res, next) {
      let post;
      try {
         post = await postModels.findById(req.params.id);
      } catch (error) {
         res.status(500).json({ message: message });
      }
      res.post = post;
      next();
   }

   async notFoundroute(req, res) {
      res.send("404");
   }
}

module.exports = new postController();
