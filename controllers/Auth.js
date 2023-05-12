const bcrypt = require('bcrypt');
const userModel = require('../models/User');


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

exports.login = ()=>{
    console.log("HELLO I AM LOGIN page");
}