
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next)=>{
    try{

        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the token by jwt
        const decoded = jwt.verify(token, 'thisismysecret');

        //Find the exact user who has the token store
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user){
            throw new Error('Something went wrong');
        }


        // store user as a current user, token as current token;  
        req.token = token;
        req.user = user;

        next();

    }catch(err){
        res.status(404).send({'error': 'Authenticate firs!'});
    }

    
}

module.exports = auth;