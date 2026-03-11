const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({msg: "No token provided"});
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if(decode.role !== "admin"){
            return res.status(403).json({msg: "Access denied"});
        }

        next();
    }
    catch(error){
        return res.status(401).json({msg: "Invalid or expired token"});
    }
} 

module.exports = authMiddleware;