const Users = require('../model/notesModel');
const {check} = require('express-validator');
const bcrypt = require('bcrypt');
var log = require('../logger/logger')
const notesServices = require('../services/notesServices');
const auth = require('../utils/auth');


let notesGet;

class Controlller {

    //add new note
    async postData(req, res) {
        try{
            await notesServices.saveNote(req, res);
            
        }catch(err){
            log.error(`users/register :- User added failed - `)

            res.status(400).json({message : err.message});
        }
    }

    //update note
    async UpdateNote(req, res){
        await notesServices.updateNote(req, res, notesGet);
    }

    // remove note
    // async removeUser(req, res){
    //     try{
    
    //         await res.notesGet.remove();
    //         log.info(`users/remove :- User removed succefully }`)

    //         res.json({message : "user Deleted"})
    //     }catch(err){
    //         log.error(`users/remove :- User removed failed`)

    //         res.status(500).json({message : err.message});
    //     }
    
    // }

    // isArchive
    async archiveNote(req, res){
        try{
            await notesServices.archiveNote(req, res, notesGet)
        }catch(err){
            log.error(`notes/isArchive :- archive failed`)

            res.status(500).json({message : err.message});
        }
    }
    async archivedNotes(req, res){
        console.log("sadasadas")
        try{
            // const user_id = auth.getUserID(req)

            await notesServices.archivedNotes(req, res)
        }catch(err){
            res.status(500).json({message : err.message});
        }
        
    }
    // isDelete
    async deleteNote(req, res){
        try{
            await notesServices.deleteNote(req, res, notesGet)
        }catch(err){
            log.error(`notes/isDelete :- delete failed`)

            res.status(500).json({message : err.message});
        }
    }
    async deletedNotes(req, res){
        try{
            // const user_id = auth.getUserID(req)

            await notesServices.deletedNotes(req, res)
        }catch(err){
            res.status(500).json({message : err.message});
        }
        
    }

    // //login
    // async checkLogin(req, res){
    //         const {email,pass} = req.body;
    //         console.log(email)//
    //         // var pa = req.body.pass;
    //     try{
            
    //         let  user = await Users.findOne( {email, pass} );
    //         console.log(user.password)
    //         if (bcrypt.compareSync(pass, user.password)) {
    //         // if(await bcrypt.compare(req.body.pass, user.password)){
    //             log.info(`users/login :- User logged in succefully - ${email}`)
                
    //             // res.send("login Successful \n" + user )
    //             res.send(user);
    //         }
    //         else{
    //             log.info(`users/login :- User logged in unsuccefully - ${email}`)
                
    //             res.send("authentication failed")
                
    //         }
    //     }
    //     catch(err){
    //         log.error(`users/login :- User logged in failed ${err}`);
    //         res.status(500).json({message : err.message});

            
    //     }


    // }

    async getUserNotes(req, res, next){
        try{
    
            notesGet = await Users.findById(req.params.id);
            if(notesGet == null){
                return res.status(404).json({message : "Cannot find the user"});
            }
        }catch(err){
            return res.status(500).json({message : err.message});
        }
    
        res.notesGet = notesGet;
        next();
    }
}

module.exports = new Controlller();