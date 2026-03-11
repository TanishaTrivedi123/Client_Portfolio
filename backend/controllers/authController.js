const express = require("express");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try{
        const {password} = req.body;

        if(!password){
            return res.status(400).json({msg: "Password is missing"});
        }

        if(password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({msg: "Invalid Password"});
        }

        const token = jwt.sign(
            {role: "admin"},
            process.env.SECRET_KEY,
            {expiresIn: "30m"}
        )

        return res.status(200).json({
            msg: "Admin is successfully login",
            token
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

module.exports = adminLogin