const mongoose=require('mongoose');

//defining the subschema for messages (to be used in chatRoomSchema)
const messageSchema=new mongoose.Schema({
  text:{
    type: String,
    required: true
  },
  
  name:{
    type: String,
    required: true
  },

  id:{
    type: String,
    required: true
  }
})

//defining the schema and model for the chatroom collection
const chatRoomSchema=new mongoose.Schema({
  roomID:{
    type: String,
    required: true
  },

  roomname:{
    type: String,
    required: true
  },

  messages:{
    type: [messageSchema],
    required: true
  }
})

const ChatRoom=mongoose.model("ChatRoom",chatRoomSchema);
module.exports=ChatRoom;