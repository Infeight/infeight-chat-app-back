 const dotenv = require("dotenv").config();

const express = require('express');
const serverless = require('serverless-http')
const PORT = process.env.port || 5001

const path = require("path")
const app = express();
const router = express.Router()
const user = require('./mongoose')
const ejs = require('ejs');
const nodemon = require('nodemon');
const { Socket } = require('socket.io');
// const socket = require('./socket')

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views','../views')

const server = app.listen(PORT, () => {
    console.log(`app started on ${PORT}`)
});


const io = require('socket.io')(server)


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/templates/signin.html'));
})




let chatusers = new Set()
let chatnames = new Set()
const array = [];
let chatmap = new Map()
let a =0;

io.on('connection', (socket) => {
    const room = "rooms"
    // console.log(socket)
    a=a+1;
    socket.join(room)
    chatusers.add(socket.id)
   
    // io.emit('socketid',socket.id)
    io.emit('chatusers', chatusers.size)
  
// let sockid = socket.id
    socket.on('disconnect', ()=>{
       a=a-1;
       
       socket.broadcast.emit("disconnecteduser",chatmap.get(socket.id),socket.id)
       chatusers.delete(socket.id)
     chatmap.delete(socket.id)
   chatnames.delete(chatmap.get(socket.id))

  
       io.emit('chatusers', chatusers.size)
      

    })
    socket.emit('socketid',socket.id)

    socket.on("message",(msgdata)=>{
        
        socket.broadcast.emit("recievedmsg",msgdata)
    })

    socket.on("usersnames",(username)=>{
    //  chatnames.forEach((e)=>{
    //     if(e==username){socket.broadcast.emit('usernamex',username,socket.id)}
        
    //     else{
       
    //     // socket.broadcast.emit("username",username)
    // }
    //  }
    //  )
    socket.broadcast.emit("usernamesw",username,socket.id)
        
    })
    socket.on('usersockt',(usersnamest,sockt)=>{
        if(chatmap.get(sockt)==usersnamest){
            chatmap.set(usersnamest,sockt)
            chatmap.forEach((v1,k1 )=>{
                socket.emit("useridsra",v1,k1)
            }) 
              }
  else{
    chatmap.set(sockt,usersnamest)
  
  
    chatnames.add(chatmap.get(sockt))
    chatmap.forEach((v,k )=>{
        socket.emit("userids",v,k)
    }) 
  }
 
   
    })
    
    socket.on("personalmsg",(personalmsg,sockid,username1 )=>{
        socket.to(sockid).emit("privatemsg",personalmsg,sockid,username1,room)
    })

});




app.post('/login', async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.password
    }
    const username2 = await user.findOne(data)
    try {
        if (data.username === username2.username) {
            if (data.password === username2.password) {

                res.render('index',{username:username2.username,chatmap:chatmap})
                // res.sendFile(path.join(__dirname, '../public/templates/index.html'))
                // res.sendFile(path.join(__dirname, '../public/templates/index.html'))
                // console.log(noofusers)
                
           
            }
           
        }
    }
    catch  {
        res.sendFile(path.join(__dirname, '../public/templates/enter.html'))
    }
}
)


app.post('/signup', async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.password
    }
    const username1 = await user.findOne(data)
    try {
        if (data.username === username1.username) {
            if (data.password === username1.password) {
                res.send("Already a user")
            }
        }
    }
    catch {
        await user.insertMany(data)
        res.send("Success")
    }
})

// app.use('/.netlify/functions/api',router)
// module.exports = app;
// module.exports.handler = serverless(app)
