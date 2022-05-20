
const User = require('../models/userModel');
 
// Create User / Signing Up rout
exports.authCreateUser = async (req, res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
    
        const user = new User({
            name: name,
            email: email, 
            password: password,
            role: role
        });
        await user.generateAuthToken();
        user.save().then(result=>{
           console.log("Results: ", result);
           res.status(200).json(result);   
         }).catch(err=>{
            res.status(404).json(err);
        })
    }catch(err){
        res.status(400).send(err);
    }
    
}

// Post Log in rout
exports.authPostLogIn = async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        // Check user by email and password
        const user = await User.findByCredential(email, password);
        const token = await user.generateAuthToken();

        console.log('User loged in ');
        res.status(200).json({user, token});

    } catch(err){
        console.log(err);
        res.status(400).send(); 
    }
    
}

//Get User base on role (user/admin)
exports.getUser = async (req, res, nex)=>{
    const user = req.user;
    if(user.role =='user'){

        //If user role = user then that user will be able to access to only his/her own data 
        res.status(200).send(req.user);
    } else if (user.role == 'admin'){

        // admin can access to all user
         const users = User.find().then(result=>{
                res.status(200).json(result);
            }).catch(err=>{
                console.log(err);
            })
    } else {

        
        res.status(401).send({"error": "User role is not specified!"});
        throw new Error('User role is not specified!');
    }

}

// Get all users
exports.getAllUser = (req, res)=>{
    User.find({}).then(result=>{
        res.status(201).json(result);
    })
    
}

//Get User By ID
exports.getUserById =  (req, res)=>{
    const id = req.params.id;

    //Find a user by it's ID
    const user = User.findById(id).then(user=>{
        //store that user into request user
        req.user = user
        res.status(200).json(user);
    }).catch(err=>{
        console.log(err);
    })
}


// Update user Data
exports.updateUserData = (req, res, nex)=>{
    // const userID = req.body.id;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedPassword = req.body.password;

    // Find a user by id and implement the changes.
    User.findById(req.user._id).then(user=>{
        user.name = updatedName;
        user.email = updatedEmail;
        user.password = updatedPassword;
        return user.save().then(result=>{
            
            res.status(200).json(result);
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log("User not found ", err);
    })

}

// Delete A User
exports.deleteAUser = async (req, res, next)=>{

        await req.user.remove();
        res.status(200).send( 'Your account is removed!');
   
}


// Log in rout
exports.authLogIn =  (req, res)=>{

    res.render('login',{
        path: '/user/login',
        PageTitle: "Login",
    });
}

exports.authLogout = async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save()

        res.status(200).send("User loged out");
    } catch(e){

        res.status(500).send();
    }
}