const mongoose = require('mongoose');

var mongoDBURL = 'mongodb+srv://jayasree2001:jayasree2001@cluster0.a94h4xl.mongodb.net/mern-rooms'

mongoose.connect(mongoDBURL, {useUnifiedTopology : true, useNewUrlParser: true})

var dbconnect = mongoose.connection

dbconnect.on('error', ()=> {
    console.log(`Mongo DB Connection failed`)
})

dbconnect.on('connected', ()=>{
    console.log(`Mongo DB connection successful`)
})

module.exports = mongoose