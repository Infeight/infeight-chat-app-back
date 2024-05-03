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

module.exports = user