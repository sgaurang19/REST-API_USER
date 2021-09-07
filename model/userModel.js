const mangoose = require('mongoose');
const userSchema = new mangoose.Schema({
    firstName:{
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    mobile:{
        type : Number,
        required: true
    },
    og_pass:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mangoose.model('users',userSchema);
