const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : {type: String, required:true},
    activity : {type : String, required: true},
    detail : String,
})



module.exports = mongoose.model("ToDov2", todoSchema)