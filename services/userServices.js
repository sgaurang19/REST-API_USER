const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
var log = require('../logger/logger')


class UserService{

    async saveUser(req,res){
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
                log.info(`users/register :- User added succefully - `)
                res.status(201).json(newUser);
    }
    async updateUser(req, res, usersget){

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

            res.status(201).json(updateUser);
        }catch(err){
            log.error(`users/register :- User update failed }`)

            res.status(400).json({message : err.message});
        }
    }

    async deleteUser(req, res, usersget){
        await res.usersget.remove();
            log.info(`users/remove :- User removed succefully }`)

            res.json({message : "user Deleted"})
    }

}

module.exports = new UserService();