const Users = require('../model/userModel');
// const dbUser = Users.users;
const {check} = require('express-validator');
const bcrypt = require('bcrypt');
const { collection } = require('../model/userModel');
const userService = require('../services/userServices')
var log = require('../logger/logger')
// const jwt = require('jsonwebtoken')
const auth = require('../utils/auth')
const mailer = require('../utils/mailer');



let usersget;
let user_id;

class Controlller {

    //add new user
    async postData(req, res) {
        try{
            await userService.saveUser(req,res);
        }catch(err){
            log.error(`users/register :- User added failed - `)

            res.status(400).json({message : err.message});
        }
    }

    //update user
    async UpdateUser(req, res){
       try{
            await userService.updateUser(req, res, usersget);
       }
       catch(err){
            log.error(`users/register :- User update failed }`)
            res.status(400).json({message : err.message});
       }
    
    }

    // remove user
    async removeUser(req, res){
        try{
            await userService.deleteUser(req, res, usersget);
            
        }catch(err){
            log.error(`users/remove :- User removed failed`)

            res.status(500).json({message : err.message});
        }
    
    }


    //login
    async checkLogin(req, res){
            const {email,pass} = req.body;
            console.log(email)//
            // var pa = req.body.pass;
        try{
            
            let  user = await Users.findOne( {email, pass} );
            console.log(user.password)
            if (bcrypt.compareSync(pass, user.password)) {
            // if(await bcrypt.compare(req.body.pass, user.password)){
                log.info(`users/login :- User logged in succefully - ${email}`)
                //to gen the token
                let tkn = await auth.generateToken(req, res, user._id);

                // res.send("login Successful \n" + user )
                res.send(user +"\n\n Token: " + tkn);
            }
            else{
                log.info(`users/login :- User logged in unsuccefully - ${email}`)
                
                res.send({message:"authentication failed"})
                
            }
        }
        catch(err){
            log.error(`users/login :- User logged in failed ${err}`);
            res.status(500).json({message : err.message});

            
        }


    }
    //reset
    async resetUserPass(req, res){
        const {email} = req.body;

        let  useremail = await Users.findOne( {email} );
        if(useremail != null){
            let tkn = await auth.generateToken(req, res, useremail._id);
            console.log(useremail._id);
            const url=`http://localhost:3001/users/reset_password/${tkn}`
            mailer.mailer(email,url, tkn )
            res.status(201).json({message: `Reset Password link send to:- ${email}`});

        }
        else{
            res.status(401).send({message:"email not found"})

        }



    }
    //reset password
    async resetPassword(req, res){
        
       user_id = await auth.getUserID(req)
    //    res.user_id = user_id
       let user_id11 = await Users.findById(user_id);
       res.user_id = user_id11
       userService.reset_Password(req, res, user_id11)

    }

    async getUsers(req, res, next){
        try{
    
            usersget = await Users.findById(req.params.id);
            if(usersget == null){
                return res.status(404).json({message : "Cannot find the user"});
            }
        }catch(err){
            return res.status(500).json({message : err.message});
        }
    
        res.usersget = usersget
        next();
    }
}

module.exports = new Controlller();