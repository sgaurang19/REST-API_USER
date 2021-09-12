const express = require('express');
const router = express.Router();
const notes = require('../model/notesModel');
const notesctrl = require('../controller/notesController');
const auth = require('../utils/auth');

// const validation = require('../controller/validator');

//getting all
router.get('/allnotes',auth.authenticateUser, async (req, res)=>{
   try{
       const usersData = await notes.find()
        res.json(usersData);

   }catch(err){
       res.status(500).json({message: err.message});
   }
});
//getting one
router.get('/:id',auth.authenticateUser,notesctrl.getUserNotes,(req, res)=>{
    res.send(res.notesGet);
});
//create one
router.post('/newNote',auth.authenticateUser,notesctrl.postData);
//update 
router.patch('/updateNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.UpdateNote);
//isArchive
router.patch('/archiveNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.archiveNote);
//isDelete
router.patch('/deleteNote/:id',auth.authenticateUser,notesctrl.getUserNotes,notesctrl.deleteNote);

//delete 
// router.delete('/removeNote/:id',notesctrl.getUserNotes,notesctrl.removeUser);

//login 
// router.post('/login', ctrl.checkLogin);




module.exports = router;