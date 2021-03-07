const mongoose = require('mongoose')

const express = require ('express');
const router =  require('./Router/auth')
const app = express()
const postRouter = require("./Router/Post")

// connecting to db
mongoose.connect('mongodb://localhost:27017/AuthApi',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("Database error:" + err);
});


// using midlweares
app.use(express.json())
//routes
app.use('/api/users',router)
app.use('/api', postRouter)
app.listen(43900,()=> console.log('The server is up and running'))