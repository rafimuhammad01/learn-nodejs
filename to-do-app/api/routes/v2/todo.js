const express = require('express')
const router = express.Router();
const ToDo = require("../../models/v2/todo")
const mongoose = require("mongoose");
const todo = require('../../models/v1/todo');



router.get("/", (req, res, next) => {
    ToDo.find({
        username : req.userData.username
    })
    .select("activity detail _id")
    .then(docs => {
        const count = docs.length
        res.status(200).json({
            count : count,
            todolist : docs.map(doc => {
                return {
                    _id : doc._id,
                    activity : doc.activity,
                    detail : doc.detail,
                    request : {
                        type : "GET",
                        url : process.env.URL + "v2/to-do/" + doc._id
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
        username : req.userData.username,
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
                    url : process.env.URL + "v2/to-do/" + result._id
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
                        url : process.env.URL + "v2/to-do/"
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

router.put("/:todoID", (req,res,next) => {
    const id = req.params.todoID
    todo.find({
        _id : id,
        username : req.userData.username
    })
    .then(result => {
        if (result) {
            if (req.body.activity != "") result.activity = req.body.activity;
            if (req.body.detail != "") result.detail = req.body.detail;
            todo.updateOne({_id:id, username:username}, result)
            .then(result => {
                return res.status(200).json({
                    message: "Data Updated!",
                    url : {
                        type : "GET",
                        url : process.env.URL + "v2/to-do/" + id
                    }
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error : err
                })
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            error : err
        })
    })

    
})
/*
router.patch('/:todoId', (req,res, next) => {
    const id = req.params.todoId;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
        
        updateOps[key] = req.body[key]
    }


    ToDo.updateOne({_id : id}, {$set: updateOps}).
    then(result => {
        res.status(200).json({
            message : "Data Updated!",
            url : {
                type : "GET",
                url : process.env.URL + "v1/to-do/" + id
            } 
        })
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : "Error", 
            status : 500,
            error : err,
        })
    })

    
})
*/

router.delete('/:todoId', (req,res, next) => {
    ToDo.remove({_id : req.params.todoId, username:req.userData})
    .select("_id activity detail")
    .then(result => {
        if (result.deletedCount != 0) {
            res.status(200).json({
                message : "Data Deleted!",
                request : {
                    type : "POST",
                    url : process.env.URL + "v2/to-do/",
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