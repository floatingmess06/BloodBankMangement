const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
        userName: {
                type:String,
                required:true
        },
        password: {
            type:String,
            required:true
    }

})


const adminModel = mongoose.model('adminModel',adminSchema)
module.exports = adminModel