const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req,res,next)=>{

    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer")){
       return res.status(401).json({
            msg : "Authorization header is missing"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Assuming `userId` exists in the token payload
        next();
    }catch(err){
        return res.status(401).json({
            msg : " Token is not valid"
        })
    }

}

module.exports = {authMiddleware}