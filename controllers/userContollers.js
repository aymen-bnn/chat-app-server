
const express = require('express')

const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const signupUser = async (req , res ) => {

    const {name , username , email , password } = req.body

    try {
        if(!name || !username || !email || ! password){
            throw Error('All fields must be filled')
        }
        //check if username and email doesn't exist on the database

        const usernameExists = await User.findOne({username})
        const emailExists = await User.findOne({email})

        if(usernameExists){
            throw Error('username already exists')
        }

        if(emailExists){
            throw Error('email already exists')
        }

        //generate salt
        const salt = await bcrypt.genSalt(10)

        //hash
        const hash = await bcrypt.hash(password , salt)

        //signup the user 
        const user = await User.create({name , username , email , password :hash})

        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json(error.message)
    }
} 

const loginUser = async (req , res) => {
    const {email , password} = req.body

    try {
        if(!email || ! password){
            throw Error('all fields must be filled')
        }

        const user = await User.findOne({email})

        //compare passswords
        const match = await bcrypt.compare(password , user.password)

        if(!match){
            throw Error('Incorrect passord')
        }

        res.status(200).json({email})

    } catch (error) {
        res.status(400).json({error : "user can't login"})
    }
}

module.exports = {signupUser}