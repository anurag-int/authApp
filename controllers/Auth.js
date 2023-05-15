const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();



// signup function
exports.signup = async (req, res)=>{
    try{
        const {name, email, password, role} = req.body;
       
            const existingUser = await userModel.findOne({email});
            if(existingUser)
            {
                return res.status(400).json({
                    message:"Email Already Exists"
                })
            }
            else
            {
                let hashedPassword
                try{
                    hashedPassword = await bcrypt.hash(password, 10);
                }
                catch(err)
                {
                    return res.json({
                        message : "Error im hashing Password"
                    })
                }

                const user = await userModel.create({
                    name : name,
                    email : email,
                    password : hashedPassword,
                    role : role
                })

                return res.status(200).json({
                    message : "User Registered Successfully"
                })


            }
        
        
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            message : "Try Again Later"
        })
    }
}


// login function
exports.login = async (req, res)=>{
    try{

            const {email, password} = req.body;
            if(!email || ! password)
            {
                return res.status(400).json({
                    message : "Please fill the required fields"
                })
            }
            else
            {
                let existingUser = await userModel.findOne({email});
                
                if(existingUser)
                {
                    const payload = {
                        email : userModel.email,
                        id : userModel._id,
                        role : userModel.role
                    }
                    const matchPassword = await bcrypt.compare(password, existingUser.password);
            
                    if(matchPassword)
                    {
                        let token = jwt.sign(payload, process.env.JWT_SECRET,{
                            expiresIn : "2h"
                        });
                        
                        existingUser.token = token;
                        existingUser.password = undefined;

                        const options = {
                            expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                            httpOnly: true//it cannot be accessed from the client side
                        }
                        res.cookie("token", token, options).status(200).json({
                            success : true,
                            token,
                            existingUser,
                            message : "User Logged in  Successfully"
                        })
                    }
                    else
                    {
                        return res.status(400).json({
                            message : "Incorrect Password"
                        })
                    }
                }
                else
                {
                    return res.status(400).json({
                        message : "Invalid User"
                    })
                }
                
            }
    }
    catch(error)
    {   
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Try Again Later"
        })
    }
    
}
