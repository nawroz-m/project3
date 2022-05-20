const express = require('express');
const userControler = require('../controlers/userContorler');
const auth = require('../middleware/auth');

const rout = express.Router();

// ======== For singin and signUp middleware is not added ======

// Post Signing Up
rout.post('/user/signup', userControler.authCreateUser);

// Post Log In rout
rout.post('/user/login', userControler.authPostLogIn);


//Read user profile
rout.get('/user/me', auth, userControler.getUser);


// Update A User
rout.post('/userUpdate', auth,  userControler.updateUserData);


// Delete a single user
rout.delete('/userDelete', auth, userControler.deleteAUser);


// LogOut user
rout.post('/user/logout', auth ,  userControler.authLogout);


// Get all users
rout.get('/user/all', userControler.getAllUser);

// Read a single user
rout.get('/user/:id', userControler.getUserById);



module.exports = rout ;
