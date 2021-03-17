const express = require('express')
const router = express.Router()
const Note = require('../models/notes')

const { isAuthenticated} = require('../helpers/auth')



router.get('/notes/add', isAuthenticated, (req,res)=>{
    res.render('notes/newNotes')
})

router.post('/notes/newNotes',isAuthenticated,  async (req,res)=>{
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
        newnote.user = req.user.id
        await newnote.save()
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes')
    }
        
})

router.get('/notes',isAuthenticated,async (req,res)=>{
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'})
    //console.log(notes)
    res.render('notes/allNotes', {notes})
})

router.get('/notes/edit/:id', isAuthenticated,async (req,res)=>{
    const note = await Note.findById(req.params.id)
    res.render('notes/editNote', {note})
})

router.put('/notes/editNote/:id', isAuthenticated,async(req,res)=>{
    const {title,description} =req.body
    await Note.findByIdAndUpdate(req.params.id, {title,description})
    req.flash('success_msg', 'Note updated successfully')
    res.redirect('/notes')
})

router.delete('/notes/delete/:id',isAuthenticated, async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted successfully')
    res.redirect('/notes')
})
module.exports = router