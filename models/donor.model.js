const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
        fullName: {
                type:String,
                required:true
        },
        Mob: {
                type:Number,
                required:true
        },
        email: {
                type:String,
                required:true
        },
        age: {
                type:Number,
                required:true
        },
        gender: {
                type:String,
                required:true
        },
        bloodgrp: {
                type:String,
                required:true
        },
        addr: {
                type:String,
                required:true
        }

})


const donorModel = mongoose.model('donorModel',donorSchema)
module.exports = donorModel