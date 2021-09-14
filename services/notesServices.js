const Notes = require('../model/notesModel');
var log = require('../logger/logger')
const auth =require('../utils/auth')


class NotesService{

    async saveNote(req, res){
        const u_id = await auth.getUserID(req)
        const newNote = new Notes({
            user_id: u_id.toString(),
            title : req.body.title,
            description : req.body.desc,
            
        })
        
            const newUserNote = await newNote.save();
            log.info(`Note/newNote :- new Note added succefully - `)
            res.status(201).json(newUserNote);
        
    }

    async updateNote(req, res, notesGet){
        if(req.body.title != null){
            res.notesGet.title = req.body.title;
        }
        if(req.body.desc != null){
            res.notesGet.description = req.body.desc;
        }
        if(req.body.color != null){
            res.notesGet.color = req.body.color;
        }
        
        try{
            const updateNote = await res.notesGet.save();
            log.info(`users/update :- User updated succefully}`)

            res.status(201).json(updateNote);
        }catch(err){
            log.error(`users/register :- User update failed }`)

            res.status(400).json({message : err.message});
        }
    }

    async archiveNote(req, res, notesGet){
        if(req.body.isArchive != null){
            res.notesGet.isArchive = req.body.isArchive;
        }
        try{
            const updateNoteArchive = await res.notesGet.save();
            log.info(`users/update :- User updated succefully}`)

            res.status(201).json(updateNoteArchive);
        }catch(err){
            log.error(`users/register :- User update failed }`)

            res.status(400).json({message : err.message});
        }
        
    }
    async archivedNotes(req, res){
        const user_ID = await auth.getUserID(req);
        const USER = user_ID.toString()
        console.log(USER)
        const archivedNotes = await Notes.find({"user_id" : USER, "isArchive": "true"})

        res.json(archivedNotes);
    }
    async deleteNote(req, res, notesGet){
        if(req.body.isDeleted != null){
            res.notesGet.isDeleted = req.body.isDeleted;
        }
        try{
            const updateNoteDelete = await res.notesGet.save();
            log.info(`users/update :- User updated succefully}`)

            res.status(201).json(updateNoteDelete);
        }catch(err){
            log.error(`users/register :- User update failed }`)

            res.status(400).json({message : err.message});
        }
    }
    async deletedNotes(req, res){
        const user_ID = await auth.getUserID(req);
        const USER = user_ID.toString()
        console.log(USER)
        const archivedNotes = await Notes.find({"user_id" : USER, "isDeleted": "true"})

        res.json(archivedNotes);
    }

}

module.exports = new NotesService();