<<<<<<< HEAD:mongoose.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Tarun2:ErHBBKbj21JAUBpu@cluster0.9ufjebs.mongodb.net/chats?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err.message);
})

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
const user =  mongoose.model('login-ids', loginSchema);

=======
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/chat").then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err.message);
})

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
const user =  mongoose.model('login-ids', loginSchema);

>>>>>>> cc5f71af6074e7590023e9faf992fac770f3075e:server/mongoose.js
module.exports = user