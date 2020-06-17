const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

router.get('/notes/add', (req,res)=>{
    res.render('notes/newNotes')
})

router.post('/notes/newNotes', async (req,res)=>{
    const {title, description} = req.body
    const errors = []
    if (!title){
        errors.push({text: 'por favor inserte un titulo'})
    }
    if(!description){
        errors.push({text: 'please write a description'})
    }
    if(errors.length>0){
        res.render('notes/newNotes', {
            errors,
            title,
            description
        })
    }
    else{
        const newnote = new Note({title,description})
        await newnote.save()
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes')
    }
        
})

router.get('/notes',async (req,res)=>{
    const notes = await Note.find().sort({date: 'desc'})
    //console.log(notes)
    res.render('notes/allNotes', {notes})
})

router.get('/notes/edit/:id', async (req,res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/editNote', {note})
})

router.put('/notes/editNote/:id', async(req,res)=>{
    const {title,description} =req.body
    await Note.findByIdAndUpdate(req.params.id, {title,description})
    req.flash('success_msg', 'Note updated successfully')
    res.redirect('/notes')
})

router.delete('/notes/delete/:id', async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
})
module.exports = router