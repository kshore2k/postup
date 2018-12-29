var User = require('./models').User;
var Post = require('./models').Post;
var Friends_List = require('./models').Friend;

var bcrypt = require('bcryptjs');
var path = require('path');

module.exports = {
    // USER CONTROLS
    allUsers: (req,res) => {
        User.find()
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    addUser: (req,res) => {
        bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, username: req.body.username, password: hashed_password})
                    .then((data) => {
                        Friends_List.create({user_id: data._id}) // CREATE FRIENDS LIST W/ NEW USER ID
                        res.json(data)
                    })
                    .catch((err)=>res.json(err))
            })
            .catch((err)=>res.json(err))
    },
    oneUser: (req,res) => {
        User.findById(req.params.id)
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    editUser: (req,res) => {
        bcrypt.hash(req.body.update_password, 10)
            .then(hashed_password => {
                User.findOneAndUpdate({_id: req.params.id}, {$set: {email: req.body.update_email, password: hashed_password}}, {runValidators: true, context: 'query', new: true})
                    .then((data)=>res.json(data))
                    .catch((err)=>res.json(err))
            })
            .catch((err)=>res.json(err))
    },
    destroyUser: (req,res) => {
        Friends_List.deleteOne({user_id: req.params.id}) // DELETE FRIENDS LIST
            .then(() => {
                User.deleteOne({_id: req.params.id}) // THEN DELETE USER
                    .then((data)=>res.json(data))
                    .catch((err)=>res.json(err))
            })
            .catch((err)=>res.json(err))
    },
    // FRIENDS LIST CONTROLS
    allFriends: (req,res) => {
        Friends_List.findOne({user_id: req.params.id})
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    addFriend: (req,res) => {
        User.findById(req.params.friend_id)
            .then(new_friend => {
                Friends_List.findOneAndUpdate({user_id: req.params.id}, {$push: {friends: new_friend}}, {new: true})
                    .then((data)=>res.json(data))
                    .catch((err)=>res.json(err))
            })
            .catch((err)=>(err))    
    },
    destroyFriend: (req,res) => {
        Friends_List.findOneAndUpdate({user_id: req.params.id}, {$pull: {friends: {_id: req.params.friend_id}}}, {new: true})
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    // POST CONTROLS
    allPosts: (req,res) => {
        Post.find()
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    onePost: (req,res) => {
        Post.findById(req.params.id)
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    addPost: (req,res) => {
        Post.create({user_id: req.body.user_id, post: req.body.post}) //Change to Session User_id Later
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    editPost: (req,res) => {
        Post.findOneAndUpdate({_id: req.params.id}, {$set: {post: req.body.update_post}}, {runValidators: true, new: true})
            .then((data)=>res.json(data))
            .catch((err)=>(err))
    },
    destroyPost: (req,res) => {
        Post.deleteOne({_id: req.params.id})
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    // COMMENT CONTROLS
    addComment: (req,res) => {
        Post.findByIdAndUpdate({_id: req.params.id}, {$push: {comments: {user_id: req.body.user_id, comment: req.body.comment}}},  {runValidators: true, new: true}) //Change to Session User_id Later
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    destroyComment: (req,res) => {
        Post.findOneAndUpdate({_id: req.params.id}, {$pull: {comments: {_id: req.params.comment_id}}}, {new: true})
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    // ANGULAR CATCH
    ngCatch: (req,res,next) => {
        res.sendFile(path.resolve('./public/dist/public/index.html'))
    }
}