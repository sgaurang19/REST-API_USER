const Users = require('../model/userModel');
// const dbUser = Users.users;
const {check} = require('express-validator');
const bcrypt = require('bcrypt');
const { collection } = require('../model/userModel');
const userService = require('../services/userServices')
var log = require('../logger/logger')
// const jwt = require('jsonwebtoken')
const auth = require('../utils/auth')



let usersget;

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
                let tkn = await auth.generateToken(req, res, email);

                // res.send("login Successful \n" + user )
                res.send(user +"\n\n Token: " + tkn);
            }
            else{
                log.info(`users/login :- User logged in unsuccefully - ${email}`)
                
                res.send("authentication failed")
                
            }
        }
        catch(err){
            log.error(`users/login :- User logged in failed ${err}`);
            res.status(500).json({message : err.message});

            
        }


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