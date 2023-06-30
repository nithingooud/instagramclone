const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')

router.get('/protected',(req,res)=>{
  res.send("Hello user")
})

router.post('/signup',(req,res) =>{
      const {name,email,password} = req.body
      if(!email || !password || !name) {
        res.json({error:"please add all the fields"})
      }
      User.findOne({email:email})
      .then((savedUser) => {
          if(savedUser){
             return res.status(422).json({error:"user already exists with that mail"})
          }
          bcrypt.hash(password,12)
          .then((hashedpassword)=>{
            const user = new User({
                email,password:hashedpassword,name
              })
              user.save()
              .then((user)=>{
                res.json({message:"saved successfully"})
              })
              .catch((err)=>{
                console.log(err)
              })
          }).catch((err)=>{
            console.log(err)
          })
      }).catch((err)=>{
        console.log(err)
      })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"some fields are missing"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid details"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((doMatch)=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router