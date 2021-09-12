const express = require('express');
const router = express.Router();
const Users = require('../model/userModel');
const ctrl = require('../controller/controller');
const validation = require('../controller/validator');
const auth = require('../utils/auth');

//getting all
router.get('/allusers',auth.authenticateUser, async (req, res)=>{
   try{
       const usersData = await Users.find()
        res.json(usersData);

   }catch(err){
       res.status(500).json({message: err.message});
   }
});
//getting one
router.get('/:id',auth.authenticateUser,ctrl.getUsers,(req, res)=>{
    res.send(res.usersget);
});
//create one
router.post('/register',validation.getCheckUsers, validation.validation('CreateAndValidate'), ctrl.postData);
//update 
router.patch('/update/:id',auth.authenticateUser,ctrl.getUsers,ctrl.UpdateUser);
//delete 
router.delete('/remove/:id',auth.authenticateUser,ctrl.getUsers,ctrl.removeUser);

//login 
router.post('/login', ctrl.checkLogin);




module.exports = router;