// middleware is a function used to check the authentication 
const jwt = require('jsonwebtoken');
require("dotenv").config();




// it checks weather the user is authenticated user or not
const auth = (req, res, next) => {
    try{
        
        //extarct JWT Token
        const token = req.body.token;
        if(!token)
        {
            return res.status(401).json({
                success : false,
                message : "Token Missing"
            })
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
            next();  
        }catch(err){
            return res.status(401).json({
                success : false,
                message : "token is invalid"
            });   
        }
        
    }
    catch(error){
        return res.status(401).json({
            success : false,
            message : "somthing went wrong verifying the token"
        })
    }
}

const isAdmin = ()=>{
    try{
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success : false,
                message : 'This is protected route for Admin'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Admin role not matched"
        })
    }
}

const isStudent = (req, res, next)=>{
    try{
        if(req.user.role !== "Student")
        {
            return res.status(401).json({
                success : false,
                message : 'This is protected route for Students'
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "User role not matched"
        })
    }
}

module.exports = {auth, isAdmin, isStudent};