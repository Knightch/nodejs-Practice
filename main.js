const strict = require("assert/strict");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

// mongodb connection
mongoose.connect("mongodb://localhost:27017/mynewdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log("database connected")
    } else {
        console.log("database not connected")
    }
})

// create schema
const sch = {
    name: String,
    email: String,
    contact: Number,
    address: String
}
const monmodel = mongoose.model("NEWCOL", sch);

// create a post req
app.post("/post", async (req, res) => {
    console.log("We are sending post req");

    const data = new monmodel({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address
    })
    const val = await data.save();
    res.send("your req send!");
})

// port run
app.listen(3000, () => {
    console.log("Welcome to post 3000")
})