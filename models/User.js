const { default: mongoose } = require('mongoose');
const mongpose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    cnic : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String
    }
     
},  {timestamps : true});
module.exports = mongpose.model('user', userSchema);




