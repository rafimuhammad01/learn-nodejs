const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    activity : {type : String, required: true},
    detail : String,
})



module.exports = mongoose.model("ToDo", todoSchema)