const express = require('express')
const router = express.Router();

router.get("/", (req, res, next) => {
    

    res.status(200).json({
        message: "GET Request to /to-do"
    })
})

router.post("/", (req, res, next) => {
    const todo = {
        activity : req.body.activity,
        detail : req.body.detail,
    }
    res.status(200).json({
        message: "Activity Created!",
        createdTodo : todo
    })
})

router.get('/:todoId', (req,res, next) => {
    const id = req.params.todoId;

    res.status(200).json({
        message : "Succsess",
        data : {
            id : id
        }
    })
})

router.patch('/:todoId', (req,res, next) => {

    res.status(200).json({
        message : "Updated!",
    })
})

router.delete('/:todoId', (req,res, next) => {

    res.status(200).json({
        message : "Deleted!",
        
    })
})


module.exports = router