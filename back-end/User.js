const mongoose=require('mongoose');

//defining the schema and model for the User collection
const userSchema=new mongoose.Schema({
    username:{
      type: String,
      required: true
    },
    hashedPassword:{
      type: String,
      required: true
    }
  })

  const User=mongoose.model("User",userSchema);
  module.exports=User;