var User = require('./models').User;
var Post = require('./models').Post;
var Friends_List = require('./models').Friend;

var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var path = require('path');

module.exports = {
    // AUTHENTICATION CONTROLS
    login: (req,res) => {
        User.findOne({email: req.body.email})
            .then((user) => {
                if(user != null){
                    bcrypt.compare(req.body.password,user.password)
                        .then(result => {
                            if(result === true){
                                req.session.user_id = user._id;
                                req.session.username = user.username;
                                res.json({msg: "Logged In User", info: user})
                            }
                            else {
                                res.json({msg: "Invalid Password"})
                            }
                        })
                }
                else {
                    res.json({msg: "User Not Found"})
                }
            })
    },
    logout: (req,res) => {
        req.session.destroy();
        res.json({msg: "Logout Successful"})
    },
    auth: (req,res) => {
        if(req.session.user_id){
            res.json({msg: "True", user_id: req.session.user_id, username: req.session.username})
        }
        else {
            res.json({msg: "False"})
        }
    },
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
                        req.session.user_id = data._id; // save user in session
                        req.session.username = data.username;
                        Friends_List.create({user_id: data._id}) // create friends list w user_id
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
    // SEND NEW-PASSWORD EMAIL
    email: (req,res) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '****@gmail.com', // *Admin Email
                pass: '****' // *Admin Pass
            }
        });
        
        var mailOptions = {
            from: 'kshore2k18@gmail.com',
            to: 'kshore2k18@gmail.com',
            subject: 'Request Password Reset',
            html: '<a href="http://localhost:8000/profile/'+req.params.id+'/edit">Click Here To Change Password</a>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });;

        res.json({msg: "Password Change Email Sent"})
    },
    editUser: (req,res) => {
        bcrypt.hash(req.body.new_password, 10)
            .then(hashed_password => {
                User.findOneAndUpdate({_id: req.params.id}, {$set: {password: hashed_password}}, {runValidators: true, context: 'query', new: true})
                    .then((data)=>res.json(data))
                    .catch((err)=>res.json(err))
            })
            .catch((err)=>res.json(err))
    },
    destroyUser: (req,res) => {
        Friends_List.deleteOne({user_id: req.params.id}) // delete friends list of user
            .then(() => {
                User.deleteOne({_id: req.params.id}) // then delete user
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
        Post.create({user_id: req.session.user_id, username: req.session.username, title: req.body.title, content: req.body.content}) //Changed to Session User_id/name
            .then((data)=>res.json(data))
            .catch((err)=>res.json(err))
    },
    editPost: (req,res) => {
        Post.findOneAndUpdate({_id: req.params.id}, {$set: {content: req.body.update_content}}, {runValidators: true, new: true})
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
        Post.findByIdAndUpdate({_id: req.params.id}, {$push: {comments: {user_id: req.session.user_id, username: req.session.username, comment: req.body.comment}}},  {runValidators: true, new: true}) //Changed to Session User_id/name
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