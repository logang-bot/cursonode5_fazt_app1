const express = require('express')
const router = express.Router()

router.get('/notes', (req,res)=>{
    res.send('note from database')
})
module.exports = router