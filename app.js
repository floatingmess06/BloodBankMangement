const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://*********:*********@cluster0.0qwj73d.mongodb.net/?retryWrites=true&w=majority"
const donorModel = require('./models/donor.model')
const adminModel = require('./models/admin.model')

mongoose.connect(mongoDB).catch( (err) =>
{if(err)console.log(`Unable to connect to the server : ${err}`);}) 

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/adminLogin', (req, res) => {
    res.sendFile(__dirname + "/loginAdmin.html")
})

app.post('/login', (req, res) => {
    const body = req.body
    const uname = body.userName
    const pass = body.password
    adminModel.find({userName:`${uname}`}).then(db =>{
        if(db[0].password === `${pass}`)
        {
            res.redirect('/dashboard_index')
        }
        else
        {
            res.redirect('/')
        }
    }).catch((err)=>{
        res.redirect('/')
    })
})

app.get('/dashboard_index',(req,res)=>{
    res.status(200).sendFile(__dirname + "/dashboard_index.html")
})

app.get('/donate', (req, res) => {
    res.sendFile(__dirname + "/addDoner.html")
})

app.get('/need', (req, res) => {
    res.sendFile(__dirname + "/need-blood.html")
})

app.get('/card', (req, res) => {
    res.sendFile(__dirname + "/card.html")
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/style.css")
})

app.get('/need-blood.css', (req, res) => {
    res.sendFile(__dirname + "/need-blood.css")
})


app.get('/getBloodData', (req, res) => {
    const body = req.body
    const blood = body.bloodgrp
    donorModel.find({bloodgrp:`${blood}`}).then(db =>{
        res.redirect('/card')
    })
})

app.get('/add_donor_index',(req,res)=>{
    res.status(200).sendFile(__dirname + "/add_donor_index.html")
})

app.get('/donor_list_index',(req,res)=>{
    res.status(200).sendFile(__dirname + "/donor_list_index.html")
})

app.get('/Update_contact_info',(req,res)=>{
        res.status(200).sendFile(__dirname + "/Update_contact_info_index.html")
})

app.get('/dashboard_style.css',(req,res)=>{
    res.status(200).sendFile(__dirname + "/dashboard_style.css")
})

app.get('/add_donor_style.css',(req,res)=>{
    res.status(200).sendFile(__dirname + "/add_donor_style.css")
})
app.get('/user1.css', (req, res) => {
    res.sendFile(__dirname + "/user1.css")
})
app.get('/donor_list_style.css',(req,res)=>{
    res.status(200).sendFile(__dirname + "/donor_list_style.css")
})

app.get('*',(req,res)=>{
    res.status(404);
})

app.post('/saved', (req, res) => {
        const dn=new donorModel(req.body)
         dn.save().then((err) => {
        res.redirect('/dashboard_index')
    }).catch((err)=>{res.json("asdfg")})
})
app.post('/update', (req, res) => {
    const body  = req.body
    const email = body.email
    const mob = body.Mob
    const addr = body.addr
    const update = {Mob: mob}
    donorModel.findOneAndUpdate({email:`${email}`},update,{new:true}).then(() =>{
        res.redirect('/dashboard_index')
    }).catch(()=>{
        res.redirect('/add_donor_index')
})
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
        console.log("server listening at 5000 port");
})