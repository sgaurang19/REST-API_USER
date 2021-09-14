const express = require('express');
const router = express.Router();
const notes = require('../model/notesModel');
const notesctrl = require('../controller/notesController');
const auth = require('../utils/auth');
const { Console } = require('winston/lib/winston/transports');

// const validation = require('../controller/validator');

//getting all
router.get('/allnotes',auth.authenticateUser, async (req, res)=>{
    let usersData;
   try{
       const user_ID = await auth.getUserID(req);
       const USER = user_ID.toString()
    //    console.log(USER)

        usersData = await notes.find({user_id : USER})

        res.json(usersData);

   }catch(err){
       res.status(500).json({message: err.message});
   }
});
// //getting one
router.get('/notes/:id',auth.authenticateUser,notesctrl.getUserNotes,(req, res)=>{
    res.send(res.notesGet);
});
//create one
router.post('/newNote',auth.authenticateUser,notesctrl.postData);
// //update 
router.patch('/updateNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.UpdateNote);
// //isArchive
router.patch('/archiveNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.archiveNote);
// //isDelete
router.patch('/deleteNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.deleteNote);
// all archived notes 
router.get('/archivedNotes',auth.authenticateUser,notesctrl.archivedNotes);
// all deleted notes
router.get('/deletedNotes',auth.authenticateUser,notesctrl.deletedNotes);


//delete 
// router.delete('/removeNote/:id',notesctrl.getUserNotes,notesctrl.removeUser);

//login 
// router.post('/login', ctrl.checkLogin);




module.exports = router;