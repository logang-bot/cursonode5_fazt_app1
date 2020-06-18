const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/users/signIn', (req,res)=>{
    res.render('users/signin')
})

router.get('/users/signUp', (req,res)=>{
    res.render('users/signup')
})

router.post('/users/signUp', async (req,res)=>{
    const{name,email,password,confirm_password} = req.body
    const errors=[]
    if(name.length <= 0){
        errors.push({text:'please insert your name'})
    }
    if(password != confirm_password){
        errors.push({text:'password do not match'})
    }
    if(password.length<4){
        errors.push({text:'password must be al least 4 characters'})
    }
    if(errors.length>0){
        res.render('users/signup', {errors, name, email, password, confirm_password})
    }
    else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'the email is already in use')
            res.redirect('/users/signUp')
        }
        else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'you are registered')
            console.log(newUser)
            res.redirect('/users/signIn')
        }
    }
})

module.exports = router