const express=require('express');
const app=express();
const http=require('http').Server(app);
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const reactAppURL="http://localhost:3000";
const PORT=process.env.PORT_HTTP || 3001;

//connecting to the myapp database
mongoose.connect("mongodb://127.0.0.1:27017/myapp");
const User=require('./User.js');
const ChatRoom=require('./ChatRoom.js');

//incorporating the cors functionality
app.use(cors());

//configuring the socket.io module
const socketIO=require('socket.io')(http,{
  cors:{
    origin: reactAppURL
  }
});

//create array of all users present in rooms
let members=[];

//updates on user activity to be logged to console
socketIO.on('connection',(socket)=>{
  //event: login request issued
  socket.on('userLogin',async(data)=>{
    let response={};

    try{
      const existingUser=await User.findOne({ username: data["username"] });
      if(!existingUser){
        response["error"]="User with given username does not exist.";
      }
      else{
        const passwordMatch=await bcrypt.compare(data["password"],existingUser["hashedPassword"]);
        if(!passwordMatch){
          response["error"]="Invalid password.";
        }
      }
    }
    catch(err){
      response["error"]="An unexpected error occurred during user login.";
    }
    
    socket.emit('loginResponse',response);
  })


  //event: user-registration request issued
  socket.on('newUser',async(data)=>{
    let response={};
    const existingUser=await User.findOne({ username: data["username"] });

    if(existingUser){
      response["error"]="User with given username already exists.";
    }
    else{
      const saltRounds=10;
      const salt=await bcrypt.genSalt(saltRounds);
      const hash=await bcrypt.hash(data["password"],salt);

      let user=new User({
        username: data["username"],
        hashedPassword: hash,
      })

      try{
        await user.save();
      }
      catch(err){
        response["error"]="An unexpected error occurred while registering the user.";
      }
    }

    socket.emit('loginResponse',response);
  })


  //event: login error (to inform the Error.js page)
  socket.on('error',(data)=>{
    socket.emit('errorResponse',data);
  })


  //event: new room request issued
  socket.on('newRoom',async(data)=>{
    let room=new ChatRoom({
      roomID: data["roomID"],
      roomname: data["roomname"],
      messages: []
    })

    await room.save();
    socket.emit('joinResponse',{ roomname: room["roomname"], messages: room["messages"], username: data["username"], socketID: data["socketID"] });

    members.push( { username: data["username"], roomID: data["roomID"], socketID: data["socketID"] });
    socketIO.emit('memberResponse',members);
  })


  //new event: join room request issued
  socket.on('joinRoom',async(data)=>{
    const existingRoom=await ChatRoom.findOne({ roomID: data["roomID"] });

    if(!existingRoom){
      socketIO.emit('joinResponse',{ error: "Room with given ID does not exist."});
    }

    socket.emit('joinResponse',{ roomname: existingRoom["roomname"], messages: existingRoom["messages"] });

    members.push( { username: data["username"], roomID: existingRoom["roomID"], socketID: data["socketID"] });
    socketIO.emit('memberResponse',members);
  })


  //event: new message sent
  socket.on('newMessage',async(data)=>{
    socketIO.emit('messageResponse',data);
    const existingRoom=await ChatRoom.findOne({ roomID: data["roomID"] });
    existingRoom["messages"].push({ text: data["text"], name: data["name"], id: data["id"] });
    await existingRoom.save();
  })


  //event: EchoRoom leave request issued
  socket.on('leaveResponse',()=>{
    members=members.filter((user)=>user["socketID"] !== socket.id);
    socketIO.emit('memberResponse',members);
  })


  //event: password-change request issued
  socket.on('changePassword',async(data)=>{
    let response={};

    try{
      const existingUser=await User.findOne({ username: data["username"] });

      const passwordMatch=await bcrypt.compare(data["originalPassword"],existingUser["hashedPassword"]);

      if(!passwordMatch){
        response["error"]="Original password entered is invalid. For authentication purposes, kindly login again to the application.";
      }
      else{
        const saltRounds=10;
        const salt=await bcrypt.genSalt(saltRounds);
        const hash=await bcrypt.hash(data["newPassword"],salt);

        existingUser["hashedPassword"]=hash;
        await existingUser.save();
      }
    }
    catch(err){
      response["error"]="An unexpected error occurred during password change. Kindly login again to the application.";
    }
    
    socket.emit('changeResponse',response);
  })

  
  //new event: user disconnects from application
  socket.on('disconnect',()=>{
    members=members.filter((user)=>user["socketID"] !== socket.id);
    socketIO.emit('memberResponse',members);
  })
});

//setting up the http listener on env PORT_HTTP (3002 by default)
http.listen(PORT,()=>{
  console.log("HTTP server listening on "+PORT);
})