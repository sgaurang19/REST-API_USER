// const {check} = require('express-validator');
// const UserCheck = require('../model/userModel');
// const Users = require('../model/userModel');
// var log = require('../logger/logger')



// class ValidatedUser{
//  async getCheckUsers(req, res){
    
//     const {email} = req.body;
//             // console.log(email)//
//             // var pa = req.body.pass;
//         try{
            
//             let  user = await Users.findOne( {email} );
           
//             if (user != null) {
//             // if(await bcrypt.compare(req.body.pass, user.password)){
//                 log.info(`user/register :- The user is already Registed with this email: ${email}`)
//                 return res.status(404).json({message : `The user is already Registed with this email: ${email}`});
//             }
//         }
//         catch(err){}

// }
//  validation(method){

//     switch(method){
//         case 'CreateAndValidate':{
//             return [
//                 check('firstName').not().isEmpty()
//                 .withMessage("FirstName is Required")
//                 .isAlpha().withMessage("Only Characters required in First Name")
//                 .isLength({min : 3}).withMessage("Min 3 Alphabates required in First Name"),

//                 check('lastName').not().isEmpty()
//                 .withMessage("Last Name is Required")
//                 .isAlpha().withMessage("Only Characters required in  Last Name")
//                 .isLength({min : 3}).withMessage("Min 3 Alphabates required in Last Name"),

//                 check('email').isEmail()
//                 .withMessage("Enter Valid email is Required"),

//                 check('pass').not().isEmpty()
//                 .withMessage("password is Required")
//                 .isLength({min : 8}).withMessage("Min 8 Alphabates required password")
//                 .isLength({max : 18}).withMessage("max 18 Alphabates allowed")

                
//             ]
//         }
//     }
// }
// }
// module.exports = new ValidatedUser();