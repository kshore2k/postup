var controller = require('./controller');

module.exports = (app) => {
    app.post('/api/login', controller.login);
    // USER ROUTES
    app.get('/api/users', controller.allUsers);
    app.post('/api/users', controller.addUser);
    app.get('/api/users/:id', controller.oneUser);
    app.put('/api/users/:id', controller.editUser);
    app.delete('/api/users/:id', controller.destroyUser);
    // USER / FRIEND ROUTES
    app.get('/api/users/:id/friends', controller.allFriends);
    app.put('/api/users/:id/friends/:friend_id', controller.addFriend);
    app.patch('/api/users/:id/friends/:friend_id', controller.destroyFriend);
    // POST ROUTES
    app.get('/api/posts', controller.allPosts);
    app.get('/api/posts/:id', controller.onePost);
    app.post('/api/posts', controller.addPost);
    app.put('/api/posts/:id', controller.editPost);
    app.delete('/api/posts/:id', controller.destroyPost);
    // COMMENT ROUTES
    app.put('/api/posts/:id/comment', controller.addComment);
    app.patch('/api/posts/:id/comment/:comment_id', controller.destroyComment);
    // ANGULAR RE-ROUTE
    app.all('*', controller.ngCatch);
}
    