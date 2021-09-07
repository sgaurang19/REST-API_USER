const Users = require('../model/userModel');
// const dbUser = Users.users;
const {check} = require('express-validator');
const bcrypt = require('bcrypt');
const { collection } = require('../model/userModel');
var log = require('../logger/logger')



let usersget;

class Controlller {

    //add new user
    async postData(req, res) {
       
        try{
            const salt = await bcrypt.genSalt();
            const setPass = await bcrypt.hash(req.body.pass, salt);
            // console.log(setPass)
        
            const usersSend = new Users({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                mobile : req.body.mobile,
                og_pass: req.body.pass,
                password: setPass
                
            })
            
                const newUser = await usersSend.save();
                log.info(`users/register :- User added succefully - ${email}`)
                res.status(201).json(newUser);
        }catch(err){
            log.error(`users/register :- User added failed - ${email}`)

            res.status(400).json({message : err.message});
        }
    }

    //update user
    async UpdateUser(req, res){
        if(req.body.firstName != null){
            res.usersget.firstName = req.body.firstName;
        }
        if(req.body.lastName != null){
            res.usersget.lastName = req.body.lastName;
        }
        if(req.body.email != null){
            res.usersget.email = req.body.email;
        }
        if(req.body.mobile != null){
            res.usersget.mobile = req.body.mobile;
        }
        if(req.body.pass != null){
            res.usersget.password = req.body.pass;
        }
        try{
            const updateUser = await res.usersget.save();
            log.info(`users/update :- User updated succefully}`)

            res.json(updateUser);
        }catch(err){
            log.error(`users/register :- User update failed }`)

            res.status(400).json({message : err.message});
        }
    
    }

    // remove user
    async removeUser(req, res){
        try{
    
            await res.usersget.remove();
            log.info(`users/remove :- User removed succefully }`)

            res.json({message : "user Deleted"})
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
                
                // res.send("login Successful \n" + user )
                res.send(user);
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