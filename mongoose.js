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

module.exports = user