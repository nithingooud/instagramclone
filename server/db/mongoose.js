const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/insta', { useNewUrlParser: true }).then(() => {
    console.log("connected to mongodb successfully");
}).catch((e) => {
    console.log("error while connecting to mongodb");
})

//mongoose.set(useCreateIndex, true);
//mongoose.set(useFindAndModify, false);

module.exports = {
    mongoose
}