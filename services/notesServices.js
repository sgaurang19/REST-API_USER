const Notes = require('../model/notesModel');
var log = require('../logger/logger')


class NotesService{

    async saveNote(req, res){
        const newNote = new Notes({
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

}

module.exports = new NotesService();