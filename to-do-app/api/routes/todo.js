const express = require('express')
const router = express.Router();
const ToDo = require("../models/todo")
const mongoose = require("mongoose")



router.get("/", (req, res, next) => {
    ToDo.find()
    .select("activity detail _id")
    .then(docs => {
        const count = docs.length
        res.status(200).json({
            count : count,
            todolist : docs.map(doc => {
                return {
                    activity : doc.activity,
                    detail : doc.detail,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/v1/to-do/" + doc._id
                    }
                }
            })
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
        res.status(201).json({
            message: "Activity Created!",
            data : {
                _id : result._id,
                activity : result.activity,
                detail : result.detail,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/v1/to-do/" + result._id
                }
            }
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
                data :  {
                    _id : result._id,
                    activity : result.activity,
                    detail : result.detail,
                    request : {
                        type : "GET",
                        description : "get all to-do-list",
                        url : "http://localhost:3000/v1/to-do/"
                    }
                }
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
            message : "Data Updated!",
            url : {
                type : "GET",
                url : "http://localhost:3000/v1/to-do/" + id
            } 
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
    .select("_id activity detail")
    .then(result => {
        if (result.deletedCount != 0) {
            res.status(200).json({
                message : "Data Deleted!",
                request : {
                    type : "POST",
                    url : "http://localhost:3000/v1/to-do/",
                    body : {
                        activity : "String (required)",
                        detail : "String"
                    }
                }
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