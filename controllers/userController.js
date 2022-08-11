const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fs = require('fs');
const {upload} = require('../middlewares/userMiddleware');
module.exports.registerUser = async (req, res) => {
    const { firstName, lastName, password, cnic, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            res.status(402).json({ error: "User already  exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(password, salt);
        if(!req.file){
            res.status(400).json({errror : "Unfailed to upload image"});
            return
        }
       
        const user = new User({
            firstName,
            lastName,
            email,
            password: hash,
            cnic,
            imageUrl : `http://localhost:5000/uploads/${req.file.filename}`
        })
        await user.save();
        if(user){
            res.status(200).json({message : "User Register Successfully"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Some error occurred" })
    }
}
module.exports.fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();        
        if (users) {
            return res.status(200).json(users);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Some errorr occurred");
    }
}
module.exports.getUser = async(req, res)=>{
    const response = await User.findById({ _id : req.params.id});
    if(response){
        res.status(200).json(response);
    }   else{
        res.status(400).json({result : "Failed to get the user"});
    }
}
module.exports.updateUser = async (req, res) => {
    const { firstName, lastName, password, cnic, email } = req.body;
    try {
        let newUser = {};
        //if you can send a file to the server then use {req.file}
        if(req.file){
            newUser = {firstName, lastName, cnic, password, email, imageUrl: `http://localhost:5000/uploads/${req.file.filename}`}
        } else{
            newUser = {firstName, lastName, cnic, password, email}
        }
        //check whether the user exist or not in to the database
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ error: "The user cannot exist" });
        }
        user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.send( user );
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(402).json({ msg: "User cannot be exist" })
        }
        user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "user can be deleted successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }

}
module.exports.searchUser = async(req,res)=>{
    try {
        let response = await User.find({
            "$or" : [
                {"firstName": {$regex : req.params.key}}
            ]
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({error : "Error occur to search user"})
    }
}


