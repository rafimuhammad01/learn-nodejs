const express = require('express')
const router = express.Router();
const mongoose = require("mongoose")
const User = require("../../models/v2/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next) => {
    User.find({
        $or:
        [
            {username: req.body.username},
            {email:req.body.email}
        ]
    },
    function(err, user) {
        if (err) {
            return res.status(500).json({
                error : err
            })
        } else if (user == null) {
            return res.status(500).json({
                error : "Email or Username already taken"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error:err
                    })
                } else {
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        username : req.body.username,
                        email : req.body.email,
                        password: hash
                    })
                    user
                    .save()
                    .then(result => {
                        return res.status(201).json({
                            message : "User created"
                        })
                    })
                    .catch( err => {
                        return res.status(500).json({
                            error : err
                        })
                    })
                }
            })
        
            
        }
    }
    )   
}) 

router.post('/login', (req, res, next) => {
    User.find({
        $or:
        [
            {username: req.body.username},
            {email: req.body.email}
        ]
        
    })
    .then(user => {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    error : "Auth Failed"
                })
            } if(result) {

                const token = jwt.sign({
                    username : user[0].username,
                    userID : user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h" 
                })
                return res.status(200).json({
                    message : "Succsess",
                    token : token
                })
            } else {
                return res.status(500).json({
                    error : "Auth Failed"
                })
            }
        })
    })
})


router.delete("/:userID", (req, res, next) => {
    User.remove({
        _id : req.params.userID
    })
    .then(result => {
        res.status(200).json({
            message : "User Deleted"
        })
    })
    .catch (err => {
        res.status(500).json({
            error : err
        })
    })
})




module.exports = router