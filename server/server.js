const express = require('express');

const app = express();

const dbConfig = require('./db')

const path =  require('path');
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings',bookingsRoute)

//static files
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Node JS Server Started using nodemon`))