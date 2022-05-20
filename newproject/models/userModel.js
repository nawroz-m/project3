const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

// Create user Schema
 const userSchema = new Schema({
     name: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         unique: true,
         required: true,
         trim: true
     }, 
     password: {
         type: String,
         required: true,
         trim: true
     },
     role: {
         type: String,
         required: true,
         trim: true
     },
     tokens: [{
         token: {
             type: String,
             required: true
         }
     }]
 })

 // Hide information
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

 //Create a token for an specific user, method is accessibale on instancess(instance methon)
userSchema.methods.generateAuthToken = async function (){

    const user = this;
    console.log(user);
    const token = await jwt.sign({_id: user._id.toString()}, 'thisismysecret');

    // Add new Token item to the token array
    user.tokens = user.tokens.concat({token: token});
    await user.save();
    return token;
}

 // Finding user By it's credential which is email and password, statics is accesable on model.
 userSchema.statics.findByCredential = async (email, password)=>{
     const user = await User.findOne({email: email})
      if(!user){
          throw new Error('Unable to logged in !');
      }

      // this will look either password match or not if not it will throw error
      const isMatch = await bcrypt.compare(password, user.password);
       
      if(!isMatch){
          throw new Error("Unable to logged in!");
      }

      return user;
 }

 // Hash the plain text password befor saving
userSchema.pre('save', async function(next){

    const user = this; 
    
    // for creating a hash I used "bcrypt"
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

 module.exports = User;


