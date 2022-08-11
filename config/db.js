const mongoose = require('mongoose');
require('dotenv').config();

module.exports = connect = async() =>{
    try {
        const response = mongoose.connect(process.env.URL);
        console.log("Connection is created successfully");
    } catch (error) {
        console.log("some error occurred in the connection");
    }
}








