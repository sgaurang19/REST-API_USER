const mangoose = require('mongoose');
const validator = require('express-validator');

const notesScheme = new mangoose.Schema({
    user_id:{
        type : String,
        required: true
    },
    title:{
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    color:{
        type: String,
        required: false
        // validator: [colorValidator, 'Invalid color'],
    },
    isArchive:{
        type : Boolean,
        required: false,
        default : false
    },
    isDeleted:{
        type: Boolean,
        required: false,
        default : false
    }
},
{
    timestamps: true
}

);

module.exports = mangoose.model('notes',notesScheme);
