const express = require('express')
const router = express.Router();
const ToDo = require("../models/todo")
const mongoose = require("mongoose")

router.get("/", (req, res, next) => {
    ToDo.find()
    .then(docs => {
        res.status(200).json({
            message: "GET Request to /to-do",
            data : docs
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Error",
            status : 500,
            error : err,
        })
    })
    
})

router.post("/", (req, res, next) => {

    const todo = new ToDo({
        _id : mongoose.Types.ObjectId(),
        activity : req.body.activity,
        detail : req.body.detail,
    })

    todo.save()
    .then(result => {
        res.status(200).json({
            message: "Activity Created!",
            data : result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Error",
            status : 500,
            data : err
        })
    })
    
})

router.get('/:todoId', (req,res, next) => {
    const id = req.params.todoId;
    ToDo.findById(id)
    .then(result => {
        if (result) {
            res.status(200).json({
                message : "succsess",
                data : result
            })
        } else {
            res.status(404).json({
                message : "not found",
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            message : "error",
            status : 500, 
            error : err
        })
    })
})

router.patch('/:todoId', (req,res, next) => {
    const id = req.params.todoId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    ToDo.updateOne({_id : id}, {$set: updateOps}).
    then(result => {
        res.status(200).json({
            message : "Updated!",
            data : result
        })
        
    })
    .catch(err => {
        res.status(500).json({
            message : "Error", 
            status : 500,
            error : err
        })
    })

    
})

router.delete('/:todoId', (req,res, next) => {
    ToDo.remove({_id : req.params.todoId})
    .then(result => {
        if (result.deletedCount != 0) {
            res.status(200).json({
                message : "deleted",
                data : result
            })
        } else {
            res.status(404).json({
                message : "not found"
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            message : "Error",
            status : 500,
            error : err
        })
    })
})


module.exports = router