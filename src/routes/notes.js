const express = require('express')
const router = express.Router()

router.get('/notes/add', (req,res)=>{
    res.render('notes/newNotes')
})

router.post('/notes/newNotes', (req,res)=>{
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
    else
        res.send('ok')
})

router.get('/notes', (req,res)=>{
    res.send('note from database')
})
module.exports = router